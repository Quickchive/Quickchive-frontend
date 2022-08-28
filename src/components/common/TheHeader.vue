<template>
  <header class="header">
    <nav>
      <div class="nav__wrapper">
        <burger-menu
          @toggle-menu="menuActive = !menuActive"
          :active="menuActive"
        ></burger-menu>
        <router-link to="/">로고</router-link>
      </div>
      <div v-if="isUserLogin" class="nav__wrapper">
        <input placeholder="제목, 메모 검색" class="input__search" />
        <button class="btn__search" @click="searchContent">
          <img :src="search" />
        </button>
        <button class="btn--transparent" @click="toMypage">
          <img :src="profile" />
        </button>
      </div>
      <button @click="logoutUser()">로그아웃</button>
    </nav>
    <div class="burger-menu__nav" v-show="menuActive">
      <span v-if="isUserLogin">{{ this.$store.state.nickname }}님 </span>
      <ul>
        <li id="burger-menu__nav-category">
          <router-link to="/"><img :src="category" />카테고리</router-link>
        </li>
        <li><router-link to="/">전체</router-link></li>
        <li><router-link to="/">기획</router-link></li>
        <li><router-link to="/">미분류</router-link></li>
      </ul>
    </div>
  </header>
</template>

<script>
import Burger from "@/components/common/Burger.vue";
import profile from "@/assets/icon/profile.svg";
import search from "@/assets/icon/search.svg";
import category from "@/assets/icon/category.svg";
export default {
  components: {
    "burger-menu": Burger,
  },
  created() {
    // 닉네임 조회
    this.$store.dispatch("FETCH_PROFILE");
  },
  data() {
    return {
      menuActive: false,
      profile,
      search,
      category,
    };
  },
  computed: {
    // 로그인 여부 조회
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    // 마이페이지로 이동
    toMypage() {
      if (this.$store.getters.isLogin && !this.$store.getters.isOauthLogin) {
        this.$router.push("/mypage");
      } else if (this.$store.getters.isOauthLogin) {
        this.$router.push("/mypage/sns");
      }
    },
    searchContent() {
      console.log("검색");
    },
    // 로그아웃
    logoutUser() {
      this.$store.dispatch("LOGOUT");
    },
  },
};
</script>

<style></style>
