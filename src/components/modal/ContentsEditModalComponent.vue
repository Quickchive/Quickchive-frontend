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
          <label class="register-form__label">링크<em>*</em></label>
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
              <select
                v-model="contentsData.categoryName"
                class="contents-modal__select"
              >
                <option value="null" selected>미분류</option>
                <option v-for="(category, index) in myCategories" :key="index">
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="register-form__wrapper">
              <label class="register-form__label">읽을 기한</label>
              <div class="flex-container modal-form__wrapper">
                <input v-model="contentsData.deadline" type="date" />
                <span class="contents-modal__date-description"
                  >D-DAY에 알림을 보내드립니다</span
                >
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

      <!-- 콜렉션 안내 문구 및 버튼 -->
      <div class="modal-card__collection__wrapper">
        <span class="modal-card__text"
          ><img :src="alert_circle" />여러 링크들을 묶어서 저장하고
          싶다면?</span
        >
        <button class="btn--transparent btn__collection">
          콜렉션으로 저장하기 >>
        </button>
      </div>
      <div class="flex-container-col">
        <button
          :disabled="!contentsData.link"
          @click="editContent()"
          class="btn--sm btnPrimary"
        >
          저장
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import closeBtn from "@/assets/icon/closeBtn.svg";
import star_border from "@/assets/icon/star_border.svg";
import star from "@/assets/icon/star.svg";
import alert_circle from "@/assets/icon/alert-circle.svg";
import { updateContents } from "@/api/contents";
import { fetchMyCategory } from "@/api/user";
import { validateLink, linkCounter } from "@/utils/validation";

export default {
  name: "ModalComponent",
  data() {
    return {
      closeBtn,
      star_border,
      star,
      alert_circle,
      // 내 카테고리 목록
      myCategories: {},
      // 폼 항목
      link: "",
      title: "",
      deadline: "",
      comment: "",
      categoryName: -1,
      favorite: false,
      // contentsData: {
      //   link: "",
      //   title: "",
      //   deadline: "",
      //   comment: "",
      //   categoryName: null,
      //   favorite: false,
      // },
      data: {},
    };
  },
  props: {
    contentsData: Object,
  },
  mounted() {
    this.getMyCategory();
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
    // 자신의 카테고리 조회
    async getMyCategory() {
      try {
        const response = await fetchMyCategory();
        console.log("카테고리 목록 조회", response.data.categories);
        this.myCategories = response.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
    // 콘텐츠 수정
    async editContent() {
      try {
        if (this.countLink == 1) {
          const data = {
            id: this.contentsData.id,
            link: this.contentsData.link,
            favorite: this.contentsData.favorite,
            comment: this.contentsData.comment,
          };
          const response = await updateContents(data);
          console.log(response);
          this.$emit("close-modal");
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
