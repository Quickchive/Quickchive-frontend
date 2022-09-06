<template>
  <header class="header">
    <nav>
      <div class="nav__wrapper">
        <burger-menu
          v-if="isUserLogin"
          @toggle-menu="openBurger()"
          :active="menuActive"
        ></burger-menu>
        <button @click="clickLogo()" class="btn--transparent btn__logo">
          Quickchive
        </button>
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
    <!-- 버거 메뉴 펼쳤을 때-->
    <div class="burger-menu__nav" v-show="menuActive">
      <span v-if="isUserLogin">{{ this.$store.state.nickname }}님 </span>
      <ul>
        <li id="burger-menu__nav-category"><img :src="category" />카테고리</li>
      </ul>
      <ul>
        <li @click="toAllCategoryPage()">전체</li>
        <li
          v-for="(category, index) in categories"
          :key="index"
          @click="toCategoryPage(index)"
        >
          {{ category.name }}
        </li>
        <li @click="toUnclassiCategoryPage()">미분류</li>
      </ul>
    </div>
  </header>
</template>

<script>
import Burger from "@/components/common/Burger.vue";
import profile from "@/assets/icon/profile.svg";
import search from "@/assets/icon/search.svg";
import category from "@/assets/icon/category.svg";
import { fetchMyCategory } from "@/api/user";
export default {
  components: {
    "burger-menu": Burger,
  },
  created() {
    // 닉네임 조회
    this.$store.dispatch("FETCH_PROFILE");
    // 카테고리 조회
    // this.fetchCategoryList();
  },
  data() {
    return {
      menuActive: false,
      profile,
      search,
      category,
      categories: [],
    };
  },
  computed: {
    // 로그인 여부 조회
    isUserLogin() {
      if (this.$store.getters.isLogin == true) {
        this.$store.dispatch("FETCH_PROFILE");
        // 카테고리 조회
        this.fetchCategoryList();
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
    // 카테고리 목록 조회
    async fetchCategoryList() {
      try {
        const response = await fetchMyCategory();
        this.categories = response.data.categories;
        console.log(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 페이지로 이동
    async toCategoryPage(index) {
      this.menuActive = false;
      console.log(this.categories[index].id, "로 이동");
      this.$router.push(`/category/${this.categories[index].id}`);
    },
    // 전체 카테고리 페이지로 이동
    toAllCategoryPage() {
      this.menuActive = false;
      this.$router.push("/category/all");
    },
    // 미분류 카테고리 페이지로 이동
    toUnclassiCategoryPage() {
      this.menuActive = false;
      this.$router.push("/category/-1");
    },
    // 버거메뉴 오픈
    async openBurger() {
      this.menuActive = !this.menuActive;
      try {
        await this.fetchCategoryList();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
