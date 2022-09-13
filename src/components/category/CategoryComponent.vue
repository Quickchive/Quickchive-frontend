<template>
  <div class="category-view">
    <h1 class="page-header">
      {{ categoryName
      }}<button
        v-if="this.categoryName !== '미분류'"
        class="btn--transparent--img"
        @click="openCategoryModal()"
      >
        <img :src="setting" />
      </button>
    </h1>
    <div>
      <div class="category__select-wrapper">
        <select v-model="categoryFilter" @change="sortData(categoryFilter)">
          <option value="latest">최신순</option>
          <option value="favorites">즐겨찾기순</option>
          <option value="expiry">읽을기한순</option>
        </select>
      </div>
      <div
        v-if="
          !this.$store.getters.getContents &&
            !this.$store.getters.getCollections
        "
      >
        <h2 class="alert">
          (임시) 해당 카테고리에 속하는 콘텐츠&콜렉션이 없습니다😯
        </h2>
      </div>
      <div v-else>
        <!-- 콘텐츠 컴포넌트 -->
        <div v-for="(data, index) in newArr" :key="index">
          <contents-component
            :contentsData="data"
            v-if="!newArr[index].contents"
          ></contents-component>
          <!-- 콜렉션 컴포넌트 -->
          <collection-component
            v-if="newArr[index].contents"
            :collectionData="data"
          ></collection-component>
        </div>
      </div>
    </div>
    <!-- 카테고리 수정 모달 컴포넌트 -->
    <category-modal-component
      v-show="isCategoryModalActive"
      @close-modal="isCategoryModalActive = false"
      :categoryModalTitle="categoryModalTitle"
      @categoryEvent="categoryEvent"
      :categoryName="newCategoryName"
      @deleteCategory="deleteCategory"
      :deleteBtn="deleteBtn"
    ></category-modal-component>
  </div>
</template>

<script>
import setting from "@/assets/icon/settings.svg";
import ContentsComponent from "@/components/content/ContentsComponent.vue";
import CollectionComponent from "@/components/collection/CollectionComponent.vue";
import CategoryModalComponent from "@/components/modal/CategoryModalComponent.vue";
import { updateCategory, deleteCategory } from "@/api/category";
import { fetchMyCategory } from "@/api/user";
import { sortLatestArr, sortFavoritesArr, sortDeadlineArr } from "@/utils/sort";
import { eventBus } from "@/main";

export default {
  components: {
    ContentsComponent,
    CollectionComponent,
    CategoryModalComponent,
  },
  data() {
    return {
      isCollectionActive: false,
      isCategoryModalActive: false,
      categoryModalTitle: "카테고리 수정",
      categoryFilter: "latest",
      setting,
      categoryId: "",
      categoryName: "",
      newCategoryName: "",
      deleteBtn: "카테고리 삭제",
      newArr: [],
      memoEvent: 0,
    };
  },
  watch: {
    $route() {
      // this.$store.dispatch("GET_CONTENTS", this.$route.params.id);
      // this.$store.dispatch("GET_COLLECTIONS", this.$route.params.id);
      this.$store.dispatch("SORT_DATA", this.$route.params.id);
      this.newArr = this.$store.getters.getLatestSortedData;
    },
    async memoEvent() {
      await this.$store.dispatch("GET_CONTENTS");
      await this.$store.dispatch("GET_COLLECTIONS");
      // 콘텐츠 컴포넌트 최신순 정렬
      this.newArr = sortLatestArr(
        this.$store.getters.getContents,
        this.$store.getters.getCollections
      );
    },
  },
  async created() {
    this.categoryId = this.$route.params.id;
    this.$store.dispatch("GET_CONTENTS", this.$route.params.id);
    this.$store.dispatch("GET_COLLECTIONS", this.$route.params.id);
    // await this.$store.dispatch("SORT_DATA", this.$route.params.id);
    // this.newArr = this.$store.getters.getLatestSortedData;
    await this.fetchCategoryName();
    this.newArr = sortLatestArr(
      this.$store.getters.getContents,
      this.$store.getters.getCollections
    );
    eventBus.$on("memoEvent", (data) => (this.memoEvent += data));
  },
  methods: {
    // 카테고리 추가 모달 열기
    openCategoryModal() {
      this.isCategoryModalActive = true;
    },
    // 카테고리 수정
    async categoryEvent(newCategoryName) {
      this.newCategoryName = newCategoryName;
      try {
        const categoryData = {
          name: this.newCategoryName,
          originalName: this.categoryName,
        };
        const response = await updateCategory(categoryData);
        console.log(response);
        this.categoryName = this.newCategoryName;
        this.isCategoryModalActive = false;
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 삭제
    async deleteCategory() {
      try {
        const response = await deleteCategory(this.categoryId);
        console.log(response);
        this.isCategoryModalActive = false;
        this.$router.push("/category/all");
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 이름 조회
    async fetchCategoryName() {
      try {
        const response = await fetchMyCategory();
        const categoryId = this.$route.params.id;
        const categories = response.data.categories;
        if (categoryId == -1) {
          this.categoryName = "미분류";
        } else {
          const categoryFilter = categories.filter(function(cate) {
            return cate.id == categoryId;
          });
          console.log(categoryFilter);
          this.categoryName = categoryFilter[0].name;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 정렬
    async sortData(filter) {
      // 최신순
      if (filter == "favorites") {
        this.newArr = sortFavoritesArr(
          this.$store.getters.getContents,
          this.$store.getters.getCollections
        );
      } else if (filter == "latest") {
        this.newArr = sortLatestArr(
          this.$store.getters.getContents,
          this.$store.getters.getCollections
        );
      } else if (filter == "expiry") {
        this.newArr = sortDeadlineArr(
          this.$store.getters.getContents,
          this.$store.getters.getCollections
        );
        console.log(this.newArr);
      }
    },
  },
};
</script>

<style>
.alert {
  padding: 50px 0;
  box-sizing: border-box;
  display: block;
}
</style>
