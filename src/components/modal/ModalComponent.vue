<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="modal-card">
      <div class="modal-card__header">
        <h1>{{ modalTitle }}</h1>
        <button
          type="button"
          class="btn--transparent btn__close"
          @click="$emit('close-modal')"
        >
          <img :src="closeBtn" />
        </button>
      </div>
      <p>{{ modalContent }}</p>
    </div>
  </div>
</template>

<script>
import closeBtn from '@/assets/icon/closeBtn.svg';
export default {
  name: 'ModalComponent',
  data() {
    return {
      closeBtn,
    };
  },
  props: {
    modalTitle: String,
    modalContent: String,
  },
};
</script>

<style></style>
