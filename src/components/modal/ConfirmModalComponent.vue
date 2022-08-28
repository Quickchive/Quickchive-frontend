<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="confirm-modal-card">
      <div class="modal-card__header">
        <p>{{ modalContent }}</p>
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
    modalContent: String,
    leftBtnMessage: String,
    rightBtnMessage: String,
  },
};
</script>

<style></style>
