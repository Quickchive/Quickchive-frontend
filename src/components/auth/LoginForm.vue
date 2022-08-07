<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="submitForm">
      <label id="email">이메일</label>
      <input type="text" v-model="email" id="email"/>
      <label>비밀번호</label>
      <input type="password" v-model="pw" id="pw"/>
      <button :disabled="!email || !pw" type="submit">로그인</button>
    </form>
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
        if (response.ok == true) {
          this.$router.push("/");
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