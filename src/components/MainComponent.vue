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
    <contents-modal-component
      v-if="isModalActive"
      @close-modal="isModalActive = false"
    ></contents-modal-component>
  </div>
</template>

<script>
import { fetchProfile } from "@/api/user";
import { logoutUser } from "@/api/auth";
import { deleteCookie } from "@/utils/cookies";
import { kakaoLogin, googleLogin } from "@/api/oauth";
import { saveAuthToCookie } from "@/utils/cookies";
import FavoriteContents from "@/components/contents/FavoriteContents.vue";
import AllContents from "@/components/contents/AllContents.vue";
import UnclassifiedContents from "@/components/contents/UnclassifiedContents.vue";
import CategoryModalComponent from "./modal/CategoryModalComponent.vue";
import plusBtn from "@/assets/icon/plusBtn.svg";
import topBtn from "@/assets/icon/topBtn.svg";
import ContentsModalComponent from "./modal/ContentsModalComponent.vue";
export default {
  components: {
    FavoriteContents,
    AllContents,
    ContentsModalComponent,
    UnclassifiedContents,
    CategoryModalComponent,
  },
  data() {
    return {
      isCategoryModalActive: false,
      plusBtn,
      isModalActive: false,
      topBtn,
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
    async userLogout() {
      try {
        const response = await logoutUser();
        console.log("로그아웃", response);
        deleteCookie("bookmark_auth");
        localStorage.removeItem("refreshToken");
        this.$store.commit("logoutUser");
      } catch (error) {
        console.log(error);
      }
    },
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
