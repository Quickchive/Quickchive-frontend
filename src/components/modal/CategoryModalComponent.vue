<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="modal-card">
      <div class="modal-card__header">
        <h1>{{ categoryModalTitle }}</h1>
        <button
          type="button"
          class="btn--transparent btn__close"
          @click="$emit('close-modal')"
        >
          <img :src="closeBtn" />
        </button>
      </div>
      <div class="modal-card__wrapper">
        <div class="register-form__wrapper">
          <label class="register-form__label">이름<em>*</em></label>
          <div class="flex-container modal-form__wrapper">
            <input v-model="categoryName" placeholder="10자 이하 권장" />
          </div>
        </div>
      </div>
      <div class="modal-card__category__wrapper">
        <div class="flex-container-col">
          <button
            :disabled="!categoryName"
            @click="categoryEvent()"
            class="btn--sm btnPrimary"
          >
            저장
          </button>
        </div>
      </div>
      <div class="modal-card__category__wrapper">
        <div class="flex-container">
          <button
            @click="$emit('deleteCategory')"
            class="btn--transparent login-form__link-register"
          >
            {{ deleteBtn }}
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
