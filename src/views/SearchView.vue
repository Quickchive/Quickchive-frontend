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
            :contents="data"
            v-if="!resultArr[index].contents"
          ></contents-component>
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
import ContentsComponent from '@/components/content/ContentsComponent.vue';

export default {
  components: {
    ContentsComponent,
  },
  data() {
    return {
      newCategoryName: '',
      contentsData: [],
      // 검색어
      resultArr: [],
      word: '',
    };
  },
  created() {
    this.resultArr = this.$store.getters.getSearchResult;
  },
};
</script>

<style></style>
