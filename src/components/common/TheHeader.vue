<template>
  <header class="header">
    <nav>
      <burger-menu
        @toggle-menu="menuActive = !menuActive"
        :active="menuActive"
      ></burger-menu>
      <router-link to="/">로고</router-link>
    </nav>
		<div v-show="menuActive">햄버거 메뉴 펼쳐짐</div>
  </header>
</template>

<script>
import Burger from '@/components/common/Burger.vue';

export default {
  components: {
		'burger-menu': Burger,
	},
  data() {
    return {
			menuActive: false,
    }
  },
}
</script>

<style>

</style>