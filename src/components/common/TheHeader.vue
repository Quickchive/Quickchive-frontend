<template>
  <header class="header">
    <nav>
      <div class="nav__wrapper">
        <burger-menu
          v-if="isUserLogin"
          @toggle-menu="menuActive = !menuActive"
          :active="menuActive"
        ></burger-menu>
        <button @click="clickLogo()" class="btn--transparent">로고</button>
      </div>
      <div class="nav__wrapper">
        <div v-if="isUserLogin" class="input__search__wrapper">
          <input placeholder="제목, 메모 검색" class="input__search" />
          <button class="btn__search" @click="searchContent">
            <img :src="search" />
          </button>
        </div>
        <button v-if="isUserLogin" class="btn--transparent" @click="toMypage">
          <img :src="profile" />
        </button>
        <div>
          <button v-if="!isUserLogin" class="btn__login--sm">
            <router-link to="/login">로그인</router-link>
          </button>
          <button
            v-if="isUserLogin"
            @click="logoutUser()"
            class="btn__logout--sm"
          >
            로그아웃
          </button>
        </div>
      </div>
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
      if (this.$store.getters.isLogin == true) {
        this.$store.dispatch("FETCH_PROFILE");

        return true;
      } else if (this.$store.getters.isOauthLogin == true) {
        this.$store.dispatch("FETCH_PROFILE");

        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    // 마이페이지로 이동
    toMypage() {
      if (this.$store.getters.isLogin) {
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
      this.$router.push("/");
    },
    // 로고 클릭 시 로그인 상태면 main으로, 로그인 전이면 온보딩으로
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
