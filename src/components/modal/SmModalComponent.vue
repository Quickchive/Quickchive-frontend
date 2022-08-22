<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="sm-modal-card">
      <div class="modal-card__header">
        <p>{{ modalContent }}</p>
      </div>
      <div class="modal-card__button-wrapper">
        <button @click="$emit('confirm')" id="btn__confirm">네</button>
        <button @click="$emit('close-modal')">아니요</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SmModalComponent",
  props: {
    modalContent: String,
  },
};
</script>

<style></style>
