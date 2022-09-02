<template>
  <div class="category-view">
    <h1 class="page-header">
      {{ categoryName
      }}<button class="btn--transparent--img" @click="openCategoryModal()">
        <img :src="setting" />
      </button>
    </h1>
    <div>
      <div class="category__select-wrapper">
        <select v-model="categoryFilter">
          <option value="latest">최신순</option>
          <option value="favoirtes">즐겨찾기순</option>
          <option value="expiry">읽을기한순</option>
        </select>
      </div>
      <contents-component
        v-for="(contents, index) in contentsData"
        :key="index"
        :contents="contents"
      ></contents-component>
      <collection-component
        v-show="isCollectionActive"
        :collectionData="collectionData"
      ></collection-component>
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
import ContentsComponent from "@/components/contents/ContentsComponent.vue";
import CollectionComponent from "@/components/contents/CollectionComponent.vue";
import CategoryModalComponent from "@/components/modal/CategoryModalComponent.vue";
import { fetchMyContents, fetchMyCollections } from "@/api/user";
import { updateCategory, deleteCategory } from "@/api/category";
import { fetchMyCategory } from "@/api/user";

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
      // 콘텐츠 props 데이터
      contentsData: {},
      // 콜렉션 더미 데이터
      collectionData: {
        title: "비즈니스 모델 분석법",
        lists: [
          "10년차 컨설턴트의 게스티네이션 노하우",
          "KSF모델로 보는 경쟁사 분석",
          "수익모델 분석방법",
          "AARRR분석하기 기초",
          "분석하기 고급",
        ],
        favorites: true,
      },
      path: this.$route.params.id,
    };
  },
  async created() {
    this.categoryId = this.$route.params.id;
    this.fetchContentsList();
    this.fetchCategoryName();
  },
  watch: {
    $route() {
      this.fetchContentsList();
      this.fetchCategoryName();
      this.categoryId = this.$route.params.id;
    },
  },
  methods: {
    // 나의 콘텐츠 조회
    async fetchContentsList() {
      const categoryId = this.$route.params.id;
      console.log("카테고리 id", categoryId);
      try {
        const response = await fetchMyContents(categoryId);
        // 콘텐츠 컴포넌트에 데이터 전달
        this.contentsData = response.data.contents;
        console.log("콘텐츠 데이터", this.contentsData);
      } catch (error) {
        console.log(error);
      }
    },
    // 나의 콜렉션 조회
    async fetchCollectionList() {
      this.categoryId = this.$route.params.id;
      console.log("카테고리 id", this.categoryId);
      try {
        const response = await fetchMyCollections(this.categoryId);
        // 콘텐츠 컴포넌트에 데이터 전달
        this.collectionData = response.data;
      } catch (error) {
        console.log(error);
      }
    },
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
        this.$route.push("/category/all");
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
          const categoryFilter = categories.filter(function (cate) {
            return cate.id == categoryId;
          });
          console.log(categoryFilter);
          this.categoryName = categoryFilter[0].name;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
