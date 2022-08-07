<template>
  <div class="hello">
    <h1>메인</h1>
    <span v-if="isUserLogin">{{ $store.state.userEmail }}님 환영합니다.</span>
  </div>
</template>

<script>
export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  }
}
</script>

<style>
</style>
