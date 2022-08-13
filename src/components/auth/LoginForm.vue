<template>
  <div class="flex-container-col">
    <h1 class="page-header">로그인</h1>
    <div class="login-wrapper">
      <form @submit.prevent="submitForm" class="login-form">
        <div>
          <label id="email" class="login-form__label">이메일</label>
          <input type="text" v-model="email" id="email"/>
        </div>
        <div>
          <label id="pw" class="login-form__label">비밀번호</label>
          <input type="password" v-model="pw" id="pw"/>
        </div>
      </form>
      <button :disabled="!email || !pw" type="submit" class="btn__login">로그인</button>
    </div>
    <label for="checkbox" class="login-form__checkbox-label "><input type="checkbox" id="checkbox" class="login-form__checkbox"/>로그인 상태 유지</label>
    <router-link to="register" class="login-form__link-register">회원가입 하기</router-link>
    <span class="login-form__or">OR</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      pw: "",
    }
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          email: this.email,
          password: this.pw
        }
        const response = await this.$store.dispatch("LOGIN", userData);
        console.log(response);
        if (response.statusCode == 201) {
          this.$router.push("/");
        } else if (response.statusCode == 409) {
          alert("회원정보를 확인해주세요.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
}
</script>

<style>

</style>