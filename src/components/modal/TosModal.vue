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
    <h1>이용 약관</h1>
    <p>
      약관 내용
    </p>
  </div>
</template>

<script>
export default {
  name: "TosModal",
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
