<template>
  <div class="main">
    <favorite-contents></favorite-contents>
    <div class="contents__wrapper">
      <all-contents></all-contents>
      <unclassified-contents></unclassified-contents>
    </div>
  </div>
</template>
<script>
import FavoriteContents from '../components/contents/FavoriteContents.vue'
import AllContents from '../components/contents/AllContents.vue'
import UnclassifiedContents from '../components/contents/UnclassifiedContents.vue'

export default {
  components: { FavoriteContents, AllContents, UnclassifiedContents },
  }
</script>

<style>

</style>