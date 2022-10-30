<template>

  <div class="confirm-modal">

    <div class="overlay"></div>

    <div class="confirm-modal-card">

      <div class="modal-card__header">

        <!-- 엑스 버튼 -->

        <div v-if="isCloseBtnShow" class="button-wrapper">

          <button
            type="button"
            class="btn--transparent btn__close"
            @click="$emit('close-modal')"
          >

            <img :src="closeBtn" />

          </button>

        </div>

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
import closeBtn from "@/assets/icon/closeBtn.svg";

export default {
  name: "ConfirmModalComponent",
  props: {
    confirmModalContent: String,
    leftBtnMessage: String,
    rightBtnMessage: String,
    isCloseBtnShow: Boolean,
  },
  data: function() {
    return {
      closeBtn,
    };
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

