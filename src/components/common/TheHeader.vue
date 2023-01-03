<template>
  <header class="header">
    <nav>
      <div class="nav__wrapper--left">
        <burger-menu
          v-if="this.$store.getters.isLogin || this.$store.getters.isOauthLogin"
          @toggle-menu="openBurger()"
          :active="menuActive"
        ></burger-menu>
        <button @click="clickLogo()" class="btn--transparent btn__logo">
          Quickchive
        </button>
      </div>
      <div class="nav__wrapper--right">
        <div
          v-if="this.$store.getters.isLogin || this.$store.getters.isOauthLogin"
          class="input__search__wrapper"
        >
          <input
            placeholder="제목, 메모 검색"
            class="input__search"
            v-model="data"
            @keyup.enter="searchData()"
          />
          <button class="btn__search" @click="searchData()">
            <img :src="search" />
          </button>
        </div>
        <button
          v-if="this.$store.getters.isLogin || this.$store.getters.isOauthLogin"
          class="btn--transparent"
          @click="toMypage"
        >
          <img :src="profile" />
        </button>
        <div>
          <button
            v-if="
              !this.$store.getters.isLogin && !this.$store.getters.isOauthLogin
            "
            class="btn__login--sm"
            @click="toLogin()"
          >
            로그인
          </button>
          <button v-else @click="logoutUser()" class="btn__logout--sm">
            로그아웃
          </button>
        </div>
      </div>
    </nav>
    <!-- 버거 메뉴 펼쳤을 때-->
    <div class="burger-menu__nav" v-show="menuActive">
      <span
        v-if="this.$store.getters.isLogin || this.$store.getters.isOauthLogin"
        class="burger-menu__nickname"
        ><strong>{{ this.$store.state.authStore.nickname }}</strong
        >&nbsp;님
      </span>
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
          {{ filterTitle(category.name) }}
        </li>
        <!-- <li @click="toUnclassiCategoryPage()">미분류</li> -->
      </ul>
    </div>
  </header>
</template>

<script>
import Burger from '@/components/common/Burger.vue';
import profile from '@/assets/icon/profile.svg';
import search from '@/assets/icon/search.svg';
import category from '@/assets/icon/category.svg';
import { fetchMyCategory } from '@/api/user';
export default {
  components: {
    'burger-menu': Burger,
  },
  created() {
    // 닉네임 조회
    this.$store.dispatch('FETCH_PROFILE');
  },
  data() {
    return {
      menuActive: false,
      profile,
      search,
      category,
      categories: [],
      data: '',
    };
  },
  computed: {
    // 로그인 여부 조회
    isUserLogin() {
      if (this.$store.getters.isLogin == true) {
        this.$store.dispatch('FETCH_PROFILE');
        // 카테고리 조회
        this.fetchCategoryList();
        return true;
      } else if (this.$store.getters.isOauthLogin == true) {
        this.$store.dispatch('FETCH_PROFILE');
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
        this.$router.push('/mypage');
      } else if (this.$store.getters.isOauthLogin) {
        this.$router.push('/mypage/sns');
      }
    },
    // 검색
    async searchData() {
      await this.$store.dispatch('SEARCH', this.data);
      // await eventBus.$emit("search", this.data);
      await this.$router.push('/search').catch(() => {});
    },
    // 로그아웃
    async logoutUser() {
      await this.$store.dispatch('LOGOUT');
      await this.$router.push('/').catch(() => {});
    },
    // 로고 클릭 시 로그인 상태면 main으로, 로그인 전이면 온보딩으로
    clickLogo() {
      if (
        this.$store.getters.isLogin == true ||
        this.$store.getters.isOauthLogin == true
      ) {
        this.$router.push('/main').catch(() => {});
      } else if (
        !this.$store.getters.isLogin ||
        !this.$store.getters.isOauthLogin
      ) {
        this.$router.push('/').catch(() => {});
      }
    },
    // 카테고리 목록 조회
    async fetchCategoryList() {
      try {
        const response = await fetchMyCategory();
        this.categories = response.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 페이지로 이동
    async toCategoryPage(index) {
      this.menuActive = false;
      this.$router.push(`/category/${this.categories[index].id}`);
    },
    // 전체 카테고리 페이지로 이동
    toAllCategoryPage() {
      this.menuActive = false;
      this.$router.push('/category/all');
    },
    // 미분류 카테고리 페이지로 이동
    toUnclassiCategoryPage() {
      this.menuActive = false;
      this.$router.push('/category/-1');
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
    // 제목 글자수 10자 이상
    filterTitle(title) {
      if (title.length >= 10) {
        return title.substr(0, 10) + '...';
      } else {
        return title;
      }
    },
    toLogin() {
      this.$router.push('/login');
    },
  },
};
</script>

<style></style>
