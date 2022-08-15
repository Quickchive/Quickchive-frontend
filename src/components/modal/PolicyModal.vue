<template>
  <div class="content">
    <div class="btn__close">
      <button
        type="button"
        class="btn--transparent"
        @click="$emit('close-modal')"
      >
        X
      </button>
    </div>
    <h1>개인정보 처리 방침</h1>
    <p>
      약관 내용
    </p>
  </div>
</template>

<script>
export default {
  name: "PolicyModal",
  props: {
    msg: String,
  },
  data() {
    return {
    };
  },
};
</script>

<style></style>
