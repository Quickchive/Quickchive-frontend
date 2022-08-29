<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="confirm-modal-card">
      <div class="modal-card__header">
        <p v-html="handleNewLine(this.confirmModalContent)"></p>
      </div>
      <div class="modal-card__button-wrapper">
        <button @click="$emit('leftBtn')" id="btn__confirm">
          {{ leftBtnMessage }}
        </button>
        <button @click="$emit('rightBtn')">{{ rightBtnMessage }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModalComponent",
  props: {
    confirmModalContent: String,
    leftBtnMessage: String,
    rightBtnMessage: String,
  },
  // 개행
  methods: {
    handleNewLine(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, "</br>");
    },
  },
};
</script>

<style></style>
