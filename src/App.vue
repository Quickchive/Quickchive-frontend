<template>
<div>
  <the-header></the-header>
  <router-view></router-view>
  <the-footer></the-footer>
</div>
</template>

<script>
import TheFooter from './components/common/TheFooter.vue'
import TheHeader from './components/common/TheHeader.vue'

export default {
  components: { TheHeader, TheFooter },
  name: 'App',
}
</script>

<style>

</style>
