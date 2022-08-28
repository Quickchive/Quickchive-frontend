<template>
  <div class="flex-container-col">
    <h1 class="page-header">로그인</h1>
    <div class="login-wrapper">
      <form class="login-form">
        <div>
          <label id="email" class="login-form__label">이메일</label>
          <input type="text" v-model="email" id="email" />
        </div>
        <div>
          <label id="pw" class="login-form__label">비밀번호</label>
          <input type="password" v-model="pw" id="pw" />
        </div>
      </form>
      <button
        :disabled="!email || !pw"
        type="button"
        @click="submitForm()"
        class="btn__login"
      >
        로그인
      </button>
    </div>
    <label for="checkbox" class="login-form__checkbox-label"
      ><input
        type="checkbox"
        id="checkbox"
        class="login-form__checkbox"
      />로그인 상태 유지</label
    >
    <router-link to="/register/email" class="login-form__link-register"
      >회원가입 하기</router-link
    >
    <span class="login-form__or">OR</span>
    <div class="oauth-btn__wrapper">
      <a href="https://api.hou27.shop/api/oauth/kakao-auth" target="_blank">
        <img :src="kakaoBtn"
      /></a>
      <a href="https://api.hou27.shop/api/oauth/google-auth" target="_blank">
        <img :src="googleBtn" />
      </a>
    </div>
  </div>
</template>

<script>
import kakaoBtn from "@/assets/img/kakaoBtn.png";
import googleBtn from "@/assets/img/googleBtn.svg";
import { kakaoAuth } from "@/api/oauth";

export default {
  data() {
    return {
      email: "",
      pw: "",
      kakaoBtn,
      googleBtn,
    };
  },

  methods: {
    async submitForm() {
      try {
        const userData = {
          email: this.email,
          password: this.pw,
        };
        await this.$store.dispatch("LOGIN", userData);
        this.$router.push("/main");
      } catch (error) {
        console.log(error);
      }
    },
    // 카카오 로그인 요청
    async getKakaoAuth() {
      try {
        await kakaoAuth();
        console.log("카카오 로그인 요청");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
