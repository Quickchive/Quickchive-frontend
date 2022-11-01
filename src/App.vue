<template>
  <div class="wrap">
    <the-header></the-header>
    <div id="content-wrap">
      <router-view></router-view>
    </div>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheFooter from "./components/common/TheFooter.vue";
import TheHeader from "./components/common/TheHeader.vue";
// import { deleteCookie } from "@/utils/cookies";
export default {
  components: { TheHeader, TheFooter },
  name: "App",
};
</script>

<style scoped>
.wrap {
  position: relative;
  min-height: 100vh;
}
#content-wrap {
  padding-bottom: 233px;
}
</style>
