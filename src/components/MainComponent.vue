<template>
  <div>
    <favorite-contents></favorite-contents>
    <div class="contents__wrapper">
      <all-contents></all-contents>
      <unclassified-contents></unclassified-contents>
    </div>

    <div class="main-btn__wrapper">
      <button @click="openCategoryModal" class="btn__addCategory">
        + Add category
      </button>
    </div>
    <category-modal-component
      v-show="isCategoryModalActive"
      @close-modal="isCategoryModalActive = false"
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
    ></contents-modal-component>
    <!-- 링크 2개 이상일 경우 모달 컴포넌트 -->
    <confirm-modal-component
      v-if="isConfirmModalActive"
      @rightBtn="isConfirmModalActive = false"
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
  </div>
</template>

<script>
import { fetchProfile } from "@/api/user";
import { kakaoLogin, googleLogin } from "@/api/oauth";
import { saveAuthToCookie } from "@/utils/cookies";
import FavoriteContents from "@/components/contents/FavoriteContents.vue";
import AllContents from "@/components/contents/AllContents.vue";
import UnclassifiedContents from "@/components/contents/UnclassifiedContents.vue";
import CategoryModalComponent from "./modal/CategoryModalComponent.vue";
import plusBtn from "@/assets/icon/plusBtn.svg";
import topBtn from "@/assets/icon/topBtn.svg";
import ContentsModalComponent from "./modal/ContentsModalComponent.vue";
import ConfirmModalComponent from "@/components/modal/ConfirmModalComponent.vue";
import AlertModalComponent from "./modal/AlertModalComponent.vue";

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
    };
  },
  created() {
    const path = this.$route.path;
    const loginInfo = path.slice(6);
    console.log("소셜 로그인 정보", loginInfo);
    if (loginInfo == "google/redirect") {
      this.getGoogleLogin();
      localStorage.setItem("oauthInfo", "google");
    } else if (loginInfo == "kakao/redirect") {
      this.getKakaoLogin();
      localStorage.setItem("oauthInfo", "kakao");
    }
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    async fetchName() {
      try {
        const response = await fetchProfile();
        console.log(response.data);
        if (response.data.statusCode == 401) {
          console.log("에러", response);
          alert("로그인이 필요합니다.");
          this.$router.push("/login");
        } else if (response.data.statusCode == 200) {
          console.log(response.data.name);
          this.$store.commit("setUserName", response.data.name);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 카카오 로그인 요청
    async getKakaoLogin() {
      try {
        const code = this.$route.query.code;
        const response = await kakaoLogin(code);
        console.log(response);
        if (response.data.statusCode == 200) {
          console.log("카카오 로그인 성공");
          localStorage.setItem("refreshToken", response.data.refresh_token);
          saveAuthToCookie(response.data.access_token);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 구글 로그인 요청
    async getGoogleLogin() {
      try {
        const code = this.$route.query.code;
        const response = await googleLogin(code);
        console.log(response);
        if (response.data.statusCode == 200) {
          console.log("구글 로그인 성공");
          localStorage.setItem("refreshToken", response.data.refresh_token);
          saveAuthToCookie(response.data.access_token);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 추가 모달 열기
    openCategoryModal() {
      this.isCategoryModalActive = true;
    },
    // 콘텐츠 추가 모달 열기
    addContents() {
      this.isModalActive = true;
    },
    // 탑 버튼
    backToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style></style>
