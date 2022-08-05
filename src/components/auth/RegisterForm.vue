<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="submitForm">
      <label id="name">이름</label>
      <input type="text" v-model="name" id="name"/>
      <label id="email">이메일</label>
      <input type="text" v-model="email" id="email"/>
      <label>비밀번호</label>
      <input type="password" v-model="pw" id="pw"/>
      <button :disabled="!name || !email || !pw" type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';
export default {
  data() {
    return {
      name: '',
      email: '',
      pw: '',
    }
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          name: this.name,
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
      this.name = '';
      this.email = '';
      this.pw = '';
    },
  },
}
</script>

<style>

</style>