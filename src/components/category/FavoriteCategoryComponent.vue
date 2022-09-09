<template>
  <div class="category-view">
    <h1 class="page-header">즐겨찾기</h1>
    <div>
      <div class="category__select-wrapper">
        <select v-model="categoryFilter" @change="sortData(categoryFilter)">
          <option value="latest">최신순</option>
          <option value="expiry">읽을기한순</option>
        </select>
      </div>
      <div
        class="alert"
        v-if="contentsData.length == 0 && collectionData.length == 0"
      >
        <h2>(임시) 아직 콘텐츠&콜렉션이 없습니다😯</h2>
      </div>
      <!-- 콘텐츠 컴포넌트 -->
      <div v-for="(data, index) in newArr" :key="index">
        <contents-component
          :contentsData="data"
          v-if="newArr[index].coverImg"
        ></contents-component>
        <!-- 콜렉션 컴포넌트 -->
        <collection-component
          v-if="!newArr[index].coverImg"
          :collectionData="data"
        ></collection-component>
      </div>
    </div>
  </div>
</template>

<script>
import ContentsComponent from "@/components/content/ContentsComponent.vue";
import CollectionComponent from "@/components/collection/CollectionComponent.vue";
import { fetchMyFavorites } from "@/api/user";
import { sortLatestArr, sortDeadlineArr } from "@/utils/sort";

export default {
  components: {
    ContentsComponent,
    CollectionComponent,
  },
  data() {
    return {
      isCollectionActive: false,
      isCategoryModalActive: false,
      categoryFilter: "latest",
      categoryId: "",
      // 즐겨찾기 더미 데이터
      contentsData: [],
      collectionData: [],
      newArr: [],
    };
  },
  async created() {
    await this.fetchFavoritesList();
    // 콘텐츠 컴포넌트 최신순 정렬
    this.newArr = sortLatestArr(this.contentsData, this.collectionData);
    console.log("newArr", this.newArr);
  },
  methods: {
    // 나의 즐겨찾기 조회
    async fetchFavoritesList() {
      try {
        const response = await fetchMyFavorites();
        // 콘텐츠 컴포넌트에 데이터 전달
        this.contentsData = response.data.favorite_contents;
        this.collectionData = response.data.favorite_collections;
        console.log("즐겨찾기 데이터", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    // 정렬
    sortData(filter) {
      console.log("정렬 메소드");
      if (filter == "latest") {
        console.log("최신 순으로 정렬한다.");
        this.newArr = sortLatestArr(this.contentsData, this.collectionData);
      } else if (filter == "expiry") {
        console.log("만기 순으로 정렬한다.");
        this.newArr = sortDeadlineArr(this.contentsData, this.collectionData);
        console.log(this.newArr);
      }
    },
  },
};
</script>

<style></style>
