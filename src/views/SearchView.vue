<template>
  <div class="search-view">
    <div v-if="!resultArr.length == 0" class="search__wrapper">
      '{{ this.$store.getters.getSearchWord }}' 에 대한 검색 결과가
      <span class="search__text--highlight">{{ resultArr.length }}</span
      >건 있습니다.
    </div>
    <div>
      <!-- 1. 검색 결과 있을 때 -->
      <div v-if="resultArr">
        <!-- 콘텐츠 컴포넌트 -->
        <div v-for="(data, index) in resultArr" :key="index">
          <contents-component
            :contentsData="data"
            v-if="!resultArr[index].contents"
          ></contents-component>
          <!-- 콜렉션 컴포넌트 -->
          <collection-component
            v-if="resultArr[index].contents"
            :collectionData="data"
          ></collection-component>
        </div>

        <!-- 2. 검색 결과 없을 때 -->
        <div class="no-result" v-if="resultArr.length == 0">
          '{{ this.$store.getters.getSearchWord }}'에 대한 검색 결과가
          없습니다😯
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContentsComponent from "@/components/content/ContentsComponent.vue";
import CollectionComponent from "@/components/collection/CollectionComponent.vue";
import { fetchMyContents, fetchMyCollections } from "@/api/user";
import { eventBus } from "@/main.js";
import { findData } from "@/utils/search.js";

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
      resultArr: [],
      data: "",
      searchEvent: 0,
      word: "",
    };
  },
  async created() {
    await this.fetchContentsList();
    await this.fetchCollectionList();
    await eventBus.$on("search", (word) => {
      this.searchEvent += 1;
      console.log("이벤트 버스ㄴㄴ", word);
      this.resultArr = findData(word, this.contentsData, this.collectionData);
    });
  },
  // watch: {
  //   searchEvent: function () {
  //     const targetData = [...this.contentsData, ...this.collectionData];
  //     this.resultArr = findData(this.word, targetData);
  //   },
  // },
  methods: {
    // 나의 콘텐츠 조회
    async fetchContentsList() {
      try {
        const response = await fetchMyContents();
        this.contentsData = response.data.contents;
      } catch (error) {
        console.log(error);
      }
    },
    // 나의 콜렉션 조회
    async fetchCollectionList() {
      try {
        const response = await fetchMyCollections();
        this.collectionData = response.data.collections;
      } catch (error) {
        console.log(error);
      }
    },
    // 검색
    findData() {
      const targetData = [...this.contentsData, ...this.collectionData];
      // const word = this.$store.getters.getSearchWord;
      // console.log(this.word, "검색 이벤트");

      this.resultArr = findData(this.word, targetData);
    },
  },
};
</script>

<style></style>
