<template>
  <div>
    <favorite-contents></favorite-contents>
    <div class="contents__wrapper-wrap">
      <all-contents :categoryTitle="categoryAll"></all-contents>
      <all-contents
        v-for="(category, index) in myCategories"
        :key="index"
        :categoryTitle="category.name"
      ></all-contents>
      <unclassified-contents></unclassified-contents>
      <button @click="openCategoryModal" class="btn__addCategory">
        + Add category
      </button>
    </div>

    <!-- 카테고리 추가 모달 컴포넌트 -->
    <category-modal-component
      v-show="isCategoryModalActive"
      @close-modal="isCategoryModalActive = false"
      :categoryModalTitle="categoryModalTitle"
      @categoryEvent="categoryEvent"
      :categoryName="categoryName"
    ></category-modal-component>

    <div class="main-btn__wrapper-col">
      <button @click="backToTop()" class="btn--transparent btn__top">
        <img :src="topBtn" />
      </button>
      <button @click="isModalActive = true" class="btn__addContents">
        <img :src="plusBtn" />
      </button>
    </div>
    <!-- 콘텐츠 추가 모달 컴포넌트 -->
    <contents-modal-component
      v-if="isModalActive"
      @close-modal="isModalActive = false"
      @isLinkNotSingle="isLinkNotSingle"
      :contentsLinks="contentsLinks"
    ></contents-modal-component>
    <!-- 링크 2개 이상일 경우 모달 컴포넌트 -->
    <confirm-modal-component
      v-if="isConfirmModalActive"
      @rightBtn="addMultipleContents()"
      @leftBtn="isConfirmModalActive = false"
      :confirmModalContent="confirmModalContent"
      :leftBtnMessage="leftBtnMessage"
      :rightBtnMessage="rightBtnMessage"
    ></confirm-modal-component>
    <!-- 중복 링크일 경우 모달 컴포넌트 -->
    <alert-modal-component
      v-if="isAlertModalActive"
      @confirmBtn="isAlertModalActive = false"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
    >
    </alert-modal-component>
    <!-- 콜렉션으로 저장 모달 -->
  </div>
</template>

<script>
import FavoriteContents from "@/components/contents/FavoriteContents.vue";
import AllContents from "@/components/contents/AllContents.vue";
import UnclassifiedContents from "@/components/contents/UnclassifiedContents.vue";
import CategoryModalComponent from "./modal/CategoryModalComponent.vue";
import plusBtn from "@/assets/icon/plusBtn.svg";
import topBtn from "@/assets/icon/topBtn.svg";
import ContentsModalComponent from "./modal/ContentsModalComponent.vue";
import ConfirmModalComponent from "@/components/modal/ConfirmModalComponent.vue";
import AlertModalComponent from "./modal/AlertModalComponent.vue";
import { addMultipleContents } from "@/api/contents";
import { addCategory } from "@/api/category";
import { fetchMyCategory } from "@/api/user";

export default {
  components: {
    FavoriteContents,
    AllContents,
    ContentsModalComponent,
    UnclassifiedContents,
    CategoryModalComponent,
    ConfirmModalComponent,
    AlertModalComponent,
  },
  data() {
    return {
      isCategoryModalActive: false,
      plusBtn,
      isModalActive: false,
      isConfirmModalActive: false,
      isAlertModalActive: false,
      topBtn,
      // confirm 모달 메시지
      confirmModalContent: "URL이 2개 이상이네요! \n 저장방식을 선택해주세요",
      leftBtnMessage: "콜렉션으로 저장",
      rightBtnMessage: "각각 콘텐츠로 저장",
      // alert 모달 메시지
      alertModalContent: "같은 카테고리에 동일 링크가 \n 이미 저장되었습니다.",
      btnMessage: "네",
      contentsLinks: [],
      // 카테고리 모달 제목
      categoryModalTitle: "카테고리 추가",
      categoryName: "",
      // 내 카테고리 목록
      myCategories: {},
      categoryAll: "전체",
    };
  },
  created() {
    const path = this.$route.path;
    const loginInfo = path.slice(6);
    if (loginInfo == "google/redirect") {
      this.getGoogleLogin();
      localStorage.removeItem("oauthInfo");
      localStorage.setItem("oauthInfo", "google");
    } else if (loginInfo == "kakao/redirect") {
      this.getKakaoLogin();
      localStorage.removeItem("oauthInfo");
      localStorage.setItem("oauthInfo", "kakao");
    }
    // 카테고리 조회
    this.getMyCategory();
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    // 카카오 로그인 요청
    async getKakaoLogin() {
      try {
        const code = this.$route.query.code;
        await this.$store.dispatch("KAKAO_LOGIN", code);
      } catch (error) {
        console.log(error);
      }
    },
    // 구글 로그인 요청
    async getGoogleLogin() {
      try {
        const code = this.$route.query.code;
        await this.$store.dispatch("GOOGLE_LOGIN", code);
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 추가 모달 열기
    openCategoryModal() {
      this.isCategoryModalActive = true;
    },
    // 카테고리 추가 이벤트
    async categoryEvent(categoryName) {
      this.categoryName = categoryName;
      this.isCategoryModalActive = false;
      try {
        const data = {
          categoryName: this.categoryName,
        };
        const response = await addCategory(data);
        this.getMyCategory();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    // 콘텐츠 추가 모달 열기
    addContents() {
      this.isModalActive = true;
    },
    // 탑 버튼
    backToTop() {
      window.scrollTo(0, 0);
    },
    isLinkNotSingle(contentsLinks) {
      this.isModalActive = false;
      this.isConfirmModalActive = true;
      this.contentsLinks = contentsLinks;
      console.log("메인컴포넌트", this.contentsLinks);
    },
    // 다수의 콘텐츠 추가 메소드
    async addMultipleContents() {
      this.isConfirmModalActive = false;
      // 예시임 -> 수정: 사용자 입력 어떻게 받을지 고민해야함
      const contentsData = {
        contentLinks: this.contentsLinks,
      };
      try {
        const response = await addMultipleContents(contentsData);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    // 자신의 카테고리 조회
    async getMyCategory() {
      try {
        const response = await fetchMyCategory();
        console.log("카테고리 목록 조회", response.data.categories);
        this.myCategories = response.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
