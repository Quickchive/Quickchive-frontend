<template>
  <div class="category-view">
    <h1 class="page-header">{{ category.name }}<img :src="setting" /></h1>
    <div>
      <contents-component :contentsData="contentsData"></contents-component>
      <collection-component
        :collectionData="collectionData"
      ></collection-component>
    </div>
  </div>
</template>

<script>
import setting from "@/assets/icon/settings.svg";
import ContentsComponent from "@/components/contents/ContentsComponent.vue";
import CollectionComponent from "../components/contents/CollectionComponent.vue";

export default {
  components: { ContentsComponent, CollectionComponent },
  data() {
    return {
      setting,
      // 더미 데이터
      category: {
        name: "카테고리명",
      },
      // 콘텐츠 더미 데이터
      contentsData: {
        title: "까일 수 밖에 없는 기획안 VS 까이지 않는 기획안",
        contents:
          "서비스기획자 뿐만 아니라 누구에게도 해당되는 것에 대하여 | 내가 꿈꿔왔던 이상향의 서비스기획자의 모습이 있다. 쿠팡의 프로덕트오너..",
        domain: "brunch",
        date: "2022.08.20",
        expiryDate: "3",
        favorites: false,
      },
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
    };
  },
};
</script>

<style></style>
