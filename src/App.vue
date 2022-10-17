<template>
  <div>
    <the-header></the-header>
    <router-view></router-view>
    <the-footer></the-footer>
    <!-- swyg 위젯 -->
    <a
      target="_blank"
      rel="noreferrer"
      href="https://www.swygbro.com?utm_source=ygb&utm_medium=widget
&utm_campaign=all_time"
      class="swyg-widget"
    >
      <img
        alt="widget logo"
        src="https://assets.swygbro.com/img/logo/single/logo_7.png"
        width="32"
        height="32"
      />
    </a>
  </div>
</template>

<script>
import TheFooter from "./components/common/TheFooter.vue";
import TheHeader from "./components/common/TheHeader.vue";
// import { deleteCookie } from "@/utils/cookies";
export default {
  components: { TheHeader, TheFooter },
  name: "App",
  // data() {
  //   return {
  //     isLeaveSite: false,
  //   };
  // },
  // mounted() {
  //   window.addEventListener("beforeunload", this.unLoadEvent);
  //   window.addEventListener("unload", this.unLoadEvent);
  // },
  // beforeUnmount() {
  //   window.removeEventListener("beforeunload", this.unLoadEvent);
  //   window.addEventListener("unload", this.unLoadEvent);
  // },
  // methods: {
  //   unLoadEvent: function (event) {
  //     // if (this.isLeaveSite) return;
  //     if (!this.$store.getters.isUserStayLogin) {
  //       localStorage.removeItem("refreshToken");
  //       deleteCookie("accessToken");
  //       localStorage.removeItem("oauthInfo");
  //     }
  //     this.$store.event.preventDefault();
  //     event.returnValue = "";
  //   },
  // },
};
</script>

<style scoped>
.swyg-widget {
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: center;
  justify-items: center;
  bottom: 1.5rem;
  right: 1.5rem;
  padding: 0.5rem;
  border-radius: 9999rem;
  background-color: white;
  filter: drop-shadow(2px 4px 15px rgba(0, 0, 0, 0.2));
  border: 0;
  cursor: pointer;
  z-index: 9999;
}
</style>
