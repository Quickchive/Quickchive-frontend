<template>
  <div class="search-view">
    <div class="search__wrapper">
      <p>'{{ data }}'</p>
      에 대한 검색 결과가
      <span class="search__text--highlight">{{ searchResultNum }}</span
      >건 있습니다.
    </div>
    <div>
      <!-- 콘텐츠 컴포넌트 -->
      <div v-for="(data, index) in newArr" :key="index">
        <contents-component
          :contentsData="data"
          v-if="!newArr[index].collectionId"
        ></contents-component>
        <!-- 콜렉션 컴포넌트 -->
        <collection-component
          v-if="!newArr[index].id && !newArr[index].deadline"
          :collectionData="data"
        ></collection-component>
      </div>
    </div>
  </div>
</template>

<script>
import ContentsComponent from "@/components/content/ContentsComponent.vue";
import CollectionComponent from "@/components/collection/CollectionComponent.vue";
import { fetchMyContents, fetchMyCollections } from "@/api/user";
import { eventBus } from "@/main.js";

export default {
  components: {
    ContentsComponent,
    CollectionComponent,
  },
  data() {
    return {
      newCategoryName: "",
      contentsData: [],
      collectionData: [],
      // 검색어
      searchResultNum: 3,
      newArr: [],
      data: "",
    };
  },
  created() {
    this.fetchContentsList();
    this.fetchContentsList();
    eventBus.$on("search", (data) => {
      this.data = data;
      console.log(this.data);
    });
  },
  computed: {},
  methods: {
    // 나의 콘텐츠 조회
    async fetchContentsList() {
      try {
        const response = await fetchMyContents();
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
    }, // 검색
  },
};
</script>

<style></style>
