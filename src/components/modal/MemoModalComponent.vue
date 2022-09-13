<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="modal-card">
      <div class="modal-card__header">
        <h1>메모</h1>
        <button
          type="button"
          class="btn--transparent btn__close"
          @click="editMemo()"
        >
          <img :src="closeBtn" />
        </button>
      </div>
      <div class="modal-card__wrapper">
        <div class="flex-container modal-form__wrapper">
          <textarea
            v-model="comment"
            placeholder=""
            class="modal-form__textarea"
            rows="5"
            maxlength="500"
          />
        </div>
      </div>
      <!-- <div class="modal-card__category__wrapper">
        <div class="flex-container-col">
          <button
            :disabled="!memoContents"
            @click="categoryEvent()"
            class="btn--sm btnPrimary"
          >
            저장
          </button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import closeBtn from "@/assets/icon/closeBtn.svg";
import { updateContents } from "@/api/contents";
export default {
  name: "MemoModalComponent",
  data() {
    return {
      closeBtn,
      comment: "",
    };
  },
  props: {
    memoContents: String,
    contentsId: Number,
  },
  created() {
    this.comment = this.memoContents;
    this.id = this.contentsId;
  },

  methods: {
    // 메모 수정
    async editMemo() {
      try {
        const contentsData = {
          id: this.id,
          comment: this.comment,
        };
        Object.keys(contentsData).forEach(
          (key) =>
            (contentsData[key] == "" || contentsData[key] == undefined) &&
            delete contentsData[key]
        );
        const response = await updateContents(contentsData);
        console.log(response);
        this.$emit("close-modal");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
