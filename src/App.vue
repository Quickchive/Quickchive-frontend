<template>
  <div>
    <the-header></the-header>
    <router-view></router-view>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "./components/common/TheFooter.vue";
import TheHeader from "./components/common/TheHeader.vue";
import { deleteCookie } from "@/utils/cookies";
export default {
  components: { TheHeader, TheFooter },
  name: "App",
  data() {
    return {
      isLeaveSite: false,
    };
  },
  mounted() {
    window.addEventListener("beforeunload", this.unLoadEvent);
    window.addEventListener("unload", this.unLoadEvent);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.unLoadEvent);
    window.addEventListener("unload", this.unLoadEvent);
  },
  methods: {
    unLoadEvent: function (event) {
      // if (this.isLeaveSite) return;
      if (!this.$store.getters.isUserStayLogin) {
        localStorage.removeItem("refreshToken");
        deleteCookie("accessToken");
        localStorage.removeItem("oauthInfo");
      }
      this.$store.event.preventDefault();
      event.returnValue = "";
    },
  },
};
</script>

<style></style>
