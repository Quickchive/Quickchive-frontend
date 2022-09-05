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
import CollectionComponent from "@/components/collection/CollectionComponent.vue";
import CategoryModalComponent from "@/components/modal/CategoryModalComponent.vue";
import { fetchMyContents, fetchMyCollections } from "@/api/user";
import { updateCategory, deleteCategory } from "@/api/category";
import { sortLatestArr, sortFavoritesArr, sortDeadline } from "@/utils/sort";

export default {
  components: {
    ContentsComponent,
    CollectionComponent,
    CategoryModalComponent,
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
      // 콘텐츠 더미 데이터
      contentsData: [
        {
          id: 0,
          title: "제목",
          link: "https://naver.com",
          comment: "설명",
          categoryName: "카테고리",
          favorites: true,
          deadline: "2022-09-27",
          createdAt: "2022-08-01",
        },
        {
          id: 1,
          title: "제목",
          link: "https://youtube.com",
          comment: "설명",
          categoryName: "카테고리",
          favorites: true,
          deadline: "2022-12-27",
          createdAt: "2022-07-01",
        },
        {
          id: 2,
          title: "제목",
          link: "https://naver.com",
          comment: "설명",
          categoryName: "카테고리",
          favorites: false,
          createdAt: "2022-01-01",
        },
        {
          id: 3,
          title: "제목",
          link: "https://naver.com",
          comment: "설명",
          categoryName: "카테고리",
          favorites: true,
          deadline: "2022-10-27",
          createdAt: "2022-02-01",
        },
        {
          id: 4,
          title: "제목",
          link: "https://naver.com",
          comment: "설명",
          categoryName: "카테고리",
          favorites: false,
          createdAt: "2022-04-01",
        },
      ],
      // 콜렉션 더미 데이터
      collectionData: [
        {
          collectionId: 0,
          title: "비즈니스 모델 분석법",
          createdAt: "2022-04-01",
          contentLinkList: [
            "10년차 컨설턴트의 게스티네이션 노하우",
            "KSF모델로 보는 경쟁사 분석",
            "수익모델 분석방법",
            "AARRR분석하기 기초",
            "분석하기 고급",
          ],
          favorites: true,
        },
        {
          collectionId: 1,
          title: "애자일 방법론",
          createdAt: "2022-08-23",
          comment: "애자일 방법론에 대하여",
          contentLinkList: [
            "10년차 컨설턴트의 게스티네이션 노하우1",
            "KSF모델로 보는 경쟁사 분석12",
            "수익모델 분석방법3",
            "AARRR분석하기 기초r",
            "분석하기 고급3",
            "AARRR분석하기 기초s",
            "분석하기 고급s",
          ],
          favorites: false,
        },
      ],
      newContentsArr: [],
      newCollectionArr: [],
      newArr: [],
    };
  },
  created() {
    this.fetchContentsList();
    // 콘텐츠 컴포넌트 최신순 정렬
    this.newArr = sortLatestArr(this.contentsData, this.collectionData);
    console.log("newArr", this.newArr);
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
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 삭제
    async deleteCategory() {
      try {
        const response = await deleteCategory(this.categoryId);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    // 정렬
    sortData(filter) {
      console.log("정렬 메소드");
      // 최신순
      if (filter == "favorites") {
        console.log("즐겨찾기 순으로 정렬한다.");
        this.newArr = sortFavoritesArr(this.contentsData, this.collectionData);
      } else if (filter == "latest") {
        console.log("최신 순으로 정렬한다.");
        this.newArr = sortLatestArr(this.contentsData, this.collectionData);
      } else if (filter == "expiry") {
        console.log("만기 순으로 정렬한다.");
        // 현재 콜렉션은 만기 없으니까 콘텐츠만 정렬함
        this.newArr = sortDeadline(this.contentsData);
        console.log(this.newArr);
      }
    },
  },
};
</script>

<style></style>
