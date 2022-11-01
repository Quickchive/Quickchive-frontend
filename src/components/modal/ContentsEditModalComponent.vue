<template>
  <div class="modal">
    <div class="overlay"></div>

    <div class="contents-modal-card">
      <div class="modal-card__header">
        <h1>콘텐츠 수정</h1>

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
          <label class="register-form__label">
            링크
            <em>*</em>
          </label>

          <div class="flex-container modal-form__wrapper">
            <input v-model="contentsData.link" placeholder="URL 입력" />

            <button
              @click="addFavorites()"
              class="btn--transparent btn__favorites"
            >
              <img v-show="!contentsData.favorite" :src="star_border" />

              <img v-show="contentsData.favorite" :src="star" />
            </button>
          </div>
        </div>

        <div>
          <div class="register-form__wrapper">
            <label class="register-form__label">이름</label>

            <input v-model="contentsData.title" placeholder="30자 이하 권장" />
          </div>

          <div class="flex-container modal-form__wrapper">
            <div class="register-form__wrapper">
              <label class="register-form__label">카테고리</label>

              <select v-model="categoryName" class="contents-modal__select">
                <option v-if="contentsData.category == null" value="">
                  카테고리 선택
                </option>

                <option v-for="(category, index) in myCategories" :key="index">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <div class="register-form__wrapper">
              <label class="register-form__label">읽을 기한</label>

              <div class="flex-container modal-form__wrapper">
                <input v-model="contentsData.deadline" type="date" />

                <span class="contents-modal__date-description">
                  D-DAY에 알림을 보내드립니다
                </span>
              </div>
            </div>
          </div>

          <div class="register-form__wrapper">
            <label class="register-form__label">메모</label>

            <input
              v-model="contentsData.comment"
              placeholder="500자 이하"
              maxlength="500"
            />
          </div>
        </div>
      </div>

      <div class="modal-card__btn__wrapper">
        <div class="flex-container">
          <button
            @click="isDeleteModalActive = true"
            class="btn--transparent login-form__link-register"
          >
            콘텐츠 삭제
          </button>
        </div>
      </div>

      <div class="flex-container-col modal-card__btn__wrapper">
        <button
          :disabled="!contentsData.link"
          @click="editContent()"
          class="btn--sm btnPrimary"
        >
          저장
        </button>
      </div>
    </div>

    <!-- 삭제 확인 모달 컴포넌트 -->

    <ConfirmModalComponent
      v-if="isDeleteModalActive == true"
      :confirmModalContent="confirmModalContent"
      :leftBtnMessage="leftBtnMessage"
      :rightBtnMessage="rightBtnMessage"
      @leftBtn="deleteContent()"
      @rightBtn="isDeleteModalActive = false"
    ></ConfirmModalComponent>

    <!-- 에러 모달 -->

    <AlertModalComponent
      v-if="isAlertModalActive == true"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
      @confirmBtn="isAlertModalActive = false"
    ></AlertModalComponent>
  </div>
</template>

<script>
import closeBtn from "@/assets/icon/closeBtn.svg";
import star_border from "@/assets/icon/star_border.svg";
import star from "@/assets/icon/star.svg";
import alert_circle from "@/assets/icon/alert-circle.svg";
import { updateContents } from "@/api/contents";
import { validateLink, linkCounter } from "@/utils/validation";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";
import { deleteContents } from "@/api/contents";
import ConfirmModalComponent from "@/components/modal/ConfirmModalComponent.vue";

export default {
  components: { AlertModalComponent, ConfirmModalComponent },
  data() {
    return {
      closeBtn,
      star_border,
      star,
      alert_circle,
      // 내 카테고리 목록
      myCategories: {},
      data: {},
      // 경고 모달
      isAlertModalActive: false,
      AlertModalContent: "",
      btnMessage: "네",
      // 삭제 모달
      leftBtnMessage: "네",
      rightBtnMessage: "아니요",
      confirmModalContent: "해당 콘텐츠를 삭제할까요?",
      isDeleteModalActive: false,
      categoryName: "",
      contentsData: {},
    };
  },
  props: {
    contentsId: Number,
  },
  async created() {
    await this.$store.dispatch("GET_CATEGORIES");
    this.myCategories = this.$store.getters.getCategories;
    await this.$store.dispatch("GET_CONTENTS");
    this.contentsData = this.$store.getters.getContents.filter(
      (data) => data.id == this.contentsId
    );
    this.contentsData = this.contentsData[0];

    if (this.contentsData.deadline !== null) {
      this.contentsData.deadline = this.contentsData.deadline.substring(0, 10);
    }
    if (this.contentsData.category == null) {
      this.categoryName = "";
    } else if (this.contentsData.category !== null) {
      this.categoryName = this.contentsData.category.name;
    }
  },
  computed: {
    // 링크 여부 확인
    isTextLink() {
      if (this.contentsData.link != "") {
        return validateLink(this.contentsData.link);
      } else {
        return null;
      }
    },
    // 링크 개수 확인
    countLink() {
      if (this.contentsData.link != "") {
        return linkCounter(this.contentsData.link);
      } else {
        return null;
      }
    },
  },
  methods: {
    addFavorites() {
      this.contentsData.favorite = !this.contentsData.favorite;
    },

    // 콘텐츠 수정
    async editContent() {
      try {
        if (this.countLink == 1) {
          const contentsData = {
            id: this.contentsData.id,
            link: this.contentsData.link,
            favorite: this.contentsData.favorite,
            comment: this.contentsData.comment,
            deadline: this.contentsData.deadline,
            categoryName: this.categoryName,
            title: this.contentsData.title,
          };
          Object.keys(contentsData).some((key) => {
            if (key !== "favorite")
              (contentsData[key] == "" || contentsData[key] == undefined) &&
                delete contentsData[key];
          });
          console.log("contentsData", contentsData);
          const response = await updateContents(contentsData);
          console.log(response);
          this.$emit("close-modal");
        }
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 콘텐츠 삭제
    async deleteContent() {
      this.isDeleteModalActive = false;
      try {
        const contentId = this.contentsData.id;
        const response = await deleteContents(contentId);
        console.log(response);
        this.$emit("close-modal");
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
  },
};
</script>

<style></style>
