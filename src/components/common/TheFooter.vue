<template>
  <footer class="footer">
    <button @click="clickLogo()" class="btn--transparent btn__logo">
      Quickchive
    </button>
  </footer>
</template>

<script>
export default {
  methods: {
    clickLogo() {
      if (this.$store.getters.isLogin || this.$store.getters.isOauthLogin) {
        this.$router.push("/main");
      } else if (
        !this.$store.getters.isLogin ||
        !this.$store.getters.isOauthLogin
      ) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
