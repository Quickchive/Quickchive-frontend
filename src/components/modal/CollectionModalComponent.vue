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
            <label class="register-form__label">콜렉션 이름<em>*</em></label>
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
          <div class="flex-container favorite__wrapper">
            <button
              @click="addFavorites()"
              class="btn--transparent btn__favorites"
            >
              <img v-show="!favorite" :src="star_border" />
              <img v-show="favorite" :src="star" />
            </button>
          </div>
        </div>

        <!-- 콜렉션 설명 -->
        <div class="register-form__wrapper">
          <label class="register-form__label">콜렉션 설명</label>
          <input v-model="comment" placeholder="100자 이하" maxlength="100" />
        </div>

        <!-- 링크 -->
        <div class="register-form__wrapper">
          <label class="register-form__label">링크<em>*</em></label>
          <div class="link__wrapper">
            <div
              v-for="(link, index) in linkList"
              :key="index"
              class="link__wrapper-inner"
            >
              <div class="link__index">{{ index + 1 }}</div>
              <input v-model="linkList[index]" placeholder="URL 입력" />
              <button
                v-if="index > 0"
                @click="deleteInput(index)"
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
        <button
          @click="createCollection()"
          :disabled="linkList == '' || !title"
          class="btn--sm btnPrimary"
        >
          저장
        </button>
      </div>
    </div>
    <!-- 에러 모달 -->
    <alert-modal-component
      v-if="isAlertModalActive == true"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
      @confirmBtn="isAlertModalActive = false"
    ></alert-modal-component>
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
import { addCollection } from "@/api/collection";
import AlertModalComponent from "./AlertModalComponent.vue";

export default {
  components: { AlertModalComponent },
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
      comment: "",
      favorite: false,
      // 경고 모달 메시지
      alertModalContent: "같은 제목의 콜렉션이 \n이미 저장되어 있습니다.",
      btnMessage: "네",
      isAlertModalActive: false,
    };
  },
  props: {
    linkList: Array,
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
    addFavorites() {
      this.favorite = !this.favorite;
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
    // 인풋 추가 이벤트
    createInput() {
      this.linkList.push("");
    },
    // 인풋 추가 이벤트
    deleteInput(index) {
      this.linkList.splice(index, 1);
    },
    // 콜렉션 추가
    async createCollection() {
      const collectionData = {
        title: this.title,
        contentLinkList: this.linkList.filter(function (item) {
          return item !== null && item !== undefined && item !== "";
        }),
        categoryName: this.categoryName,
        comment: this.comment,
        favorite: this.favorite,
      };
      // 설명 없는 경우 설명 값 삭제
      if (this.comment == "") {
        delete collectionData.comment;
      }
      try {
        const response = await addCollection(collectionData);
        console.log(response);
        console.log(" 최종 보낼 값", collectionData);
      } catch (error) {
        console.log(error);
        // 409: 같은 title의 collection이 존재하는 경우
        this.alertModalContent = error.response.message;
        this.isAlertModalActive = true;
      }
    },
  },
};
</script>

<style></style>
