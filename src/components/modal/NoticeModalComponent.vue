<template>
  <div class="notice-modal">
    <div class="overlay"></div>

    <div class="notice-modal-card">
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
        <img :src="key" />
        <h3>{{ noticeTitle }}</h3>
        <p v-html="handleNewLine(this.confirmModalContent)"></p>
      </div>
    </div>
  </div>
</template>

<script>
import closeBtn from '@/assets/icon/closeBtn.svg';
import key from '@/assets/img/key.png';

export default {
  name: 'NoticeModalComponent',
  props: {
    confirmModalContent: String,
    isCloseBtnShow: Boolean,
    noticeTitle: String,
  },
  data() {
    return {
      closeBtn,
      key,
    };
  },
  // 개행
  methods: {
    handleNewLine(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, '</br>');
    },
  },
};
</script>

<style></style>
