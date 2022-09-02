<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="modal-card">
      <div class="modal-card__header">
        <h1>메모</h1>
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
          <textarea
            v-model="memo"
            placeholder=""
            class="modal-form__textarea"
            rows="5"
          />
        </div>
      </div>
      <div class="modal-card__category__wrapper">
        <div class="flex-container-col">
          <button
            :disabled="!memo"
            @click="categoryEvent()"
            class="btn--sm btnPrimary"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import closeBtn from "@/assets/icon/closeBtn.svg";
export default {
  name: "ModalComponent",
  data() {
    return {
      closeBtn,
      categoryName: "",
      memo: "",
    };
  },
  props: {
    categoryModalTitle: String,
    deleteBtn: String,
  },
  methods: {
    categoryEvent() {
      let categoryName = this.categoryName;
      this.$emit("categoryEvent", categoryName);
    },
  },
};
</script>

<style></style>
