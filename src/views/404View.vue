<template>
  <div class="error-page">
    <div class="error-container">
      <img :src="message" />
      <div>
        <h1>404</h1>
        <h2>페이지를 찾을 수 없습니다.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import message from '@/assets/img/message.png';
export default {
  data() {
    return {
      message,
    };
  },
};
</script>

<style></style>
