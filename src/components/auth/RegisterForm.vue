<template>
  <div class="flex-container-col">
    <h1 class="page-header">회원가입</h1>
    <div class="register-wrapper">
      <form @submit.prevent="submitForm">
      <div class="register-form__email">
        <div class="register-form__wrapper">
          <label for="email" class="register-form__label">이메일</label>
          <input type="text" v-model="email" id="email"/>
        </div>
        <span>@</span>
        <select>
          <option>naver.com</option>
          <option>google.com</option>
          <option>daum.net</option>
        </select>
        <button class="btn__verify">인증</button>
      </div> 
      <div class="register-form__wrapper">
        <label for="nickname" class="register-form__label">닉네임</label>
        <input type="text" v-model="nickname" id="nickname" placeholder="2 ~ 8자"/>
      </div>
      <div class="register-form__wrapper">
        <label for="pw" class="register-form__label">비밀번호</label>
        <input type="password" v-model="pw" id="pw" placeholder="8자 이상 문자, 숫자, 기호 사용 가능"/>
      </div>
      <div class="register-form__wrapper">
        <label for="pwCheck" class="register-form__label">비밀번호 확인</label>
        <input type="password" v-model="pwCheck" id="pwCheck" placeholder="비밀번호 재입력"/>
      </div>
      <label for="checkbox" class="register-form__checkbox-label">
      <input type="checkbox" id="checkbox" class="login-form__checkbox"/>
      <router-link to="/">이용약관</router-link>&nbsp;및&nbsp;<router-link to="/">개인정보 처리방침</router-link>에 동의합니다.
    </label>
      <button class="btn__register" :disabled="!nickname || !email || !pw" type="submit">회원가입</button>
      </form>
    

    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';
export default {
  data() {
    return {
      nickname: '',
      email: '',
      pw: '',
      pwCheck: '',
    }
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          nickname: this.nickname,
          email: this.email,
          password: this.pw,
        };
        const response = await registerUser(userData);
        if (response.status == 201) {
          alert("인증 이메일이 전송되었습니다.");
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.nickName = '';
      this.email = '';
      this.pw = '';
    },
  },
}
</script>

<style>

</style>