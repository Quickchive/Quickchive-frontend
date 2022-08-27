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
      <div class="nav__wrapper">
        <input placeholder="제목, 메모 검색" class="input__search" />
        <button class="btn__search" @click="searchContent">
          <img :src="search" />
        </button>
        <button class="btn--transparent" @click="toMypage">
          <img :src="profile" />
        </button>
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
  data() {
    return {
      menuActive: false,
      profile,
      search,
      category,
    };
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    toMypage() {
      this.$router.push("/mypage");
    },
    searchContent() {
      console.log("검색");
    },
  },
};
</script>

<style></style>
