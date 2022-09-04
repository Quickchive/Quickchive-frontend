<template>
  <div class="alert-modal">
    <div class="overlay"></div>
    <div class="alert-modal-card">
      <div class="modal-card__header">
        <p v-html="handleNewLine(this.alertModalContent)"></p>
      </div>
      <div class="modal-card__button-wrapper">
        <button @click="$emit('confirmBtn')">
          <p v-html="handleNewLine(this.btnMessage)"></p>
          <!-- {{ btnMessage }} -->
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AlertModalComponent",
  props: {
    alertModalContent: String,
    btnMessage: String,
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
