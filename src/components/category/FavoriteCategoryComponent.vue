<template>
  <div class="category-view">
    <h1 class="page-header">즐겨찾기</h1>
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
        :contentsData="contents"
      ></contents-component>
    </div>
  </div>
</template>

<script>
import ContentsComponent from "@/components/content/ContentsComponent.vue";
import { fetchMyFavorites } from "@/api/user";

export default {
  components: {
    ContentsComponent,
  },
  data() {
    return {
      isCollectionActive: false,
      isCategoryModalActive: false,
      categoryFilter: "latest",
      categoryId: "",
      // 즐겨찾기 더미 데이터
      contentsData: [],
    };
  },
  async created() {
    this.fetchFavoritesList();
  },
  methods: {
    // 나의 콘텐츠 조회
    async fetchFavoritesList() {
      try {
        const response = await fetchMyFavorites();
        // 콘텐츠 컴포넌트에 데이터 전달
        this.contentsData = response.data.favorites;
        console.log("콘텐츠 데이터", this.contentsData);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
