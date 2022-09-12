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
      <div class="alert" v-if="newArr.length == 0">
        <h2>(임시) 아직 콘텐츠&콜렉션이 없습니다😯</h2>
      </div>
      <!-- 콘텐츠 컴포넌트 -->
      <div v-for="(data, index) in newArr" :key="index">
        <contents-component
          :contentsData="data"
          v-if="!data.contents"
        ></contents-component>
        <!-- 콜렉션 컴포넌트 -->
        <collection-component
          v-if="data.contents"
          :collectionData="data"
        ></collection-component>
      </div>
    </div>
  </div>
</template>

<script>
import ContentsComponent from "@/components/content/ContentsComponent.vue";
import CollectionComponent from "@/components/collection/CollectionComponent.vue";
import { sortDeadlineArr } from "@/utils/sort";

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
    await this.$store.dispatch("GET_FAVORITES");
    this.newArr = this.$store.getters.getLatestSortedFavorite;
  },
  methods: {
    // 정렬
    async sortData(filter) {
      if (filter == "latest") {
        await this.$store.dispatch("GET_FAVORITES");

        this.newArr = this.$store.getters.getLatestSortedFavorite;
      } else if (filter == "expiry") {
        this.newArr = sortDeadlineArr(
          this.$store.getters.getFavoriteContents,
          this.$store.getters.getFavoriteCollections
        );
        console.log(this.newArr);
      }
    },
  },
};
</script>

<style></style>
