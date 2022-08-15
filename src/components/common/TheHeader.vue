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
        <input placeholder="제목, 메모 검색" class="input__search"/>
        <button class="btn__search" @click="searchContent">
          <img :src="search"/>
        </button>
        <button class="btn--transparent" @click="toMypage">
          <img :src="profile"/>
        </button>
      </div>
      
    </nav>
		<div v-show="menuActive">햄버거 메뉴 펼쳐짐</div>
  </header>
</template>

<script>
import Burger from '@/components/common/Burger.vue';
import profile from '@/assets/icon/profile.svg';
import search from '@/assets/icon/search.svg';
export default {
  components: {
		'burger-menu': Burger,
	},
  data() {
    return {
			menuActive: false,
      profile,
      search,
    }
  },
  methods: {
    toMypage() {
      this.$router.push('/mypage');
    },
    searchContent() {
      console.log("검색");
    }
  },
}
</script>

<style>

</style>