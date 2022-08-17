<template>
  <div class="favorite-content">
    <header>
      <div class="favorite-content__header-wrapper">
        <h3>즐겨찾기</h3>
        <img :src="star"/>
      </div>
      <button @click="showContent()">
        <img v-if="!contentState" :src="plus"/>
        <img v-if="contentState" :src="minus"/>
      </button>
    </header>
    
  </div>
</template>

<script>
import plus from '@/assets/icon/plus.svg';
import minus from '@/assets/icon/minus.svg';
import star from '@/assets/icon/star.svg';


export default {
  data() {
    return {
      plus,
      minus,
      star,
      contentState: false,
    }
  },
  methods: {
    showContent() {
      this.contentState = !this.contentState;
    },
    // 즐겨찾기 생성
    createFavorites(index) {
      console.log('인덱스', index);
      this.contents[index].isFavoriteContent = !this.contents[index].isFavoriteContent
    }
  },
}
</script>

<style>

</style>