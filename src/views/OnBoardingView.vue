<template>
  <div class="onboarding-page">
    <h1>
      다시보고 싶은 콘텐츠를<br />
      체계적으로 정리하는 방법
    </h1>
    <img :src="onboardingImg" />
    <button v-if="!isUserLogin" class="btn__register btnValid" @click="toLogin">
      로그인
    </button>
  </div>
</template>

<script>
import onboardingImg from "@/assets/img/onboarding.jpeg";
export default {
  data() {
    return {
      onboardingImg,
    };
  },
  computed: {
    isUserLogin() {
      if (this.$store.getters.isLogin == true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    toLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.onboarding-page {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 140px 180px;
}

.onboarding-page > h1 {
  text-align: center;
}

.onboarding-page img {
  width: 300px;
  margin: 30px 0 60px 0;
  border-radius: 12px;
}
</style>
