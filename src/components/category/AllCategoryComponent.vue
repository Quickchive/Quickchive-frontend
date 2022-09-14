<template>
  <div class="category-view">
    <h1 class="page-header">전체</h1>
    <div>
      <div class="category__select-wrapper">
        <select v-model="categoryFilter" @change="sortData(categoryFilter)">
          <option value="latest">최신순</option>
          <option value="favorites">즐겨찾기순</option>
          <option value="expiry">읽을기한순</option>
        </select>
      </div>
      <div
        class="alert"
        v-if="
          !this.$store.getters.getContents &&
            !this.$store.getters.getCollections
        "
      >
        <h2>(임시) 아직 콘텐츠&콜렉션이 없습니다😯</h2>
      </div>
      <div v-else>
        <div v-for="(data, index) in newArr" :key="index">
          <contents-component
            :contents="data"
            v-if="!newArr[index].contents"
          ></contents-component>
          <!-- 콜렉션 컴포넌트 -->
          <collection-component
            v-if="newArr[index].contents"
            :collection="data"
          ></collection-component>
        </div>
      </div>
      <!-- 콘텐츠 컴포넌트 -->
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
    <!-- 에러 모달 -->
    <AlertModalComponent
      v-if="isAlertModalActive == true"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
      @confirmBtn="isAlertModalActive = false"
    ></AlertModalComponent>
  </div>
</template>

<script>
import setting from "@/assets/icon/settings.svg";
import ContentsComponent from "@/components/content/ContentsComponent.vue";
import CollectionComponent from "@/components/collection/CollectionComponent.vue";
import CategoryModalComponent from "@/components/modal/CategoryModalComponent.vue";
import { updateCategory, deleteCategory } from "@/api/category";
import { sortLatestArr, sortFavoritesArr, sortDeadlineArr } from "@/utils/sort";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";
import { eventBus } from "@/main";

export default {
  components: {
    ContentsComponent,
    CollectionComponent,
    CategoryModalComponent,
    AlertModalComponent,
  },
  data() {
    return {
      isCategoryModalActive: false,
      categoryModalTitle: "카테고리 수정",
      categoryFilter: "latest",
      setting,
      categoryId: 0,
      categoryName: "",
      newCategoryName: "",
      deleteBtn: "카테고리 삭제",
      newArr: [],
      isAlertModalActive: false,
      AlertModalContent: "",
      btnMessage: "네",
      memoEvent: 0,
      contentsModalEvent: 0,
      collectionModalEvent: 0,
    };
  },
  watch: {
    async memoEvent() {
      await this.$store.dispatch("GET_CONTENTS");
      await this.$store.dispatch("GET_COLLECTIONS");
      // 콘텐츠 컴포넌트 최신순 정렬
      this.newArr = sortLatestArr(
        this.$store.getters.getContents,
        this.$store.getters.getCollections
      );
    },
    async contentsModalEvent() {
      await this.$store.dispatch("GET_CONTENTS");
      await this.$store.dispatch("GET_COLLECTIONS");
      // 콘텐츠 컴포넌트 최신순 정렬
      this.newArr = sortLatestArr(
        this.$store.getters.getContents,
        this.$store.getters.getCollections
      );
    },
    async collectionModalEvent() {
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
    await this.$store.dispatch("GET_CONTENTS");
    await this.$store.dispatch("GET_COLLECTIONS");
    // 콘텐츠 컴포넌트 최신순 정렬
    this.newArr = sortLatestArr(
      this.$store.getters.getContents,
      this.$store.getters.getCollections
    );
    eventBus.$on("memoEvent", (data) => (this.memoEvent += data));
    eventBus.$on(
      "contentsModalActive",
      (data) => (this.contentsModalEvent += data)
    );
    eventBus.$on(
      "collectionModalActive",
      (data) => (this.collectionModalEvent += data)
    );
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
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 카테고리 삭제
    async deleteCategory() {
      try {
        const response = await deleteCategory(this.categoryId);
        console.log(response);
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 정렬
    sortData(filter) {
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

<style></style>
