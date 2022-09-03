<template>
  <div class="modal">
    <div class="overlay"></div>
    <div class="collection-modal-card">
      <div class="modal-card__header">
        <h1>콜렉션 추가</h1>
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
          <div class="register-form__wrapper">
            <label class="register-form__label">콜렉션 이름</label>
            <input v-model="title" placeholder="10자 이하 권장" />
          </div>
          <div class="register-form__wrapper category__wrapper">
            <label class="register-form__label">카테고리</label>
            <select v-model="categoryName" class="contents-modal__select">
              <option value="-1" selected>미분류</option>
              <option v-for="(category, index) in myCategories" :key="index">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- 콜렉션 설명 -->
        <div class="register-form__wrapper">
          <label class="register-form__label">콜렉션 설명</label>
          <input
            v-model="description"
            placeholder="100자 이하"
            maxlength="100"
          />
        </div>

        <!-- 링크 -->
        <div class="register-form__wrapper">
          <label class="register-form__label">링크</label>
          <div class="link__wrapper">
            <div class="link__wrapper-inner">
              <div class="link__index">1</div>
              <input v-model="linkList[0]" placeholder="URL 입력" />
            </div>
            <div
              v-for="index in linkInputs"
              :key="index"
              class="link__wrapper-inner"
            >
              <div class="link__index">{{ index + 1 }}</div>
              <input v-model="linkList[index + 1]" placeholder="URL 입력" />
              <button
                @click="deleteInput()"
                class="btn--transparent btn__deleteLink"
              >
                <img :src="minus" />
              </button>
            </div>
          </div>

          <div class="flex-container-col modal-card__btn__wrapper">
            <button @click="createInput()" class="btn--transparent">
              <img :src="add_link" />
            </button>
          </div>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex-container-col modal-card__btn__wrapper">
        <button class="btn--sm btnPrimary">저장</button>
      </div>
    </div>
  </div>
</template>

<script>
import closeBtn from "@/assets/icon/closeBtn.svg";
import star_border from "@/assets/icon/star_border.svg";
import star from "@/assets/icon/star.svg";
import alert_circle from "@/assets/icon/alert-circle.svg";
import add_link from "@/assets/icon/addLink.svg";
import minus from "@/assets/icon/minus.svg";
import { fetchMyCategory } from "@/api/user";
import { validateLink } from "@/utils/validation";

export default {
  name: "ModalComponent",
  data() {
    return {
      closeBtn,
      star_border,
      star,
      alert_circle,
      add_link,
      isDetailSettingActive: false,
      minus,
      // 내 카테고리 목록
      myCategories: {},
      // 폼 항목
      title: "",
      categoryName: -1,
      description: "",
      linkInputs: 0,
      linkList: [],
    };
  },
  mounted() {
    this.getMyCategory();
  },
  computed: {
    // 링크 여부 확인
    isTextLink() {
      if (this.linkList != "") {
        return validateLink(this.linkList);
      } else {
        return null;
      }
    },
  },
  methods: {
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
    // 인풋 추가 이벤트
    createInput() {
      this.linkInputs += 1;
    },
    // 인풋 추가 이벤트
    deleteInput() {
      this.linkInputs -= 1;
    },
  },
};
</script>

<style></style>
