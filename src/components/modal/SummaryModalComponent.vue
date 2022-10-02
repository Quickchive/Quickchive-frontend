<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="modal-card">
      <div class="modal-card__header">
        <h1>요약</h1>
        <button
          type="button"
          class="btn--transparent btn__close"
          @click="$emit('close-modal')"
        >
          <img :src="closeBtn" />
        </button>
      </div>
      <div class="modal-card__wrapper">
        <div class="flex-container modal-form__wrapper">
          <p v-html="handleNewLine(this.summaryContents)"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import closeBtn from "@/assets/icon/closeBtn.svg";
export default {
  name: "SummaryModalComponent",
  data() {
    return {
      closeBtn,
    };
  },
  props: {
    summaryContents: String,
  },
  methods: {
    handleNewLine(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, "</br>");
    },
  },
};
</script>

<style></style>
