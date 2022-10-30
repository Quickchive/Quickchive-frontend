<template>

  <div class="modal">

    <div class="overlay"></div>

    <div class="collection-modal-card">

      <div class="modal-card__header">

        <h1>콜렉션 수정</h1>

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

            <label class="register-form__label">
               콜렉션 이름
              <em>*</em>

            </label>

            <input v-model="collections.title" placeholder="10자 이하 권장" />

          </div>

          <div class="register-form__wrapper category__wrapper">

            <label class="register-form__label">카테고리</label>

            <select v-model="categoryName" class="contents-modal__select">

              <option value="" v-if="this.collections.category == null">
                 카테고리 선택
              </option>

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

              <img v-show="!collections.favorite" :src="star_border" />

              <img v-show="collections.favorite" :src="star" />

            </button>

          </div>

        </div>

        <!-- 콜렉션 설명 -->

        <div class="register-form__wrapper">

          <label class="register-form__label">콜렉션 설명</label>

          <input
            v-model="collections.comment"
            placeholder="100자 이하"
            maxlength="100"
          />

        </div>

        <!-- 링크 -->

        <div class="register-form__wrapper">

          <label class="register-form__label">
             링크
            <em>*</em>

          </label>

          <div class="link__wrapper">

            <div
              class="link__wrapper-inner"
              v-for="(content, index) in this.collections.contents"
              :key="index"
            >

              <div class="link__index">{{ index + 1 }}</div>

              <input
                v-model="collections.contents[index].link"
                placeholder="URL 입력"
              />

              <button
                v-if="collections.contents.length != 1"
                @click="deleteInput(index)"
                class="btn--transparent btn__deleteLink"
              >

                <img :src="minus" />

              </button>

            </div>

          </div>

          <div
            class="flex-container-col modal-card__btn__wrapper"
            v-if="collections.contents"
          >

            <button
              @click="createInput(collections.contents.length)"
              class="btn--transparent btn--plus"
            >

              <img :src="add_link" />

            </button>

          </div>

        </div>

      </div>

      <div class="modal-card__btn__wrapper">

        <div class="flex-container">

          <button
            @click="isDeleteModalActive = true"
            class="btn--transparent login-form__link-register"
          >
             콜렉션 삭제
          </button>

        </div>

      </div>

      <!-- 버튼 -->

      <div class="flex-container-col modal-card__btn__wrapper">

        <button
          @click="editCollection()"
          :disabled="collections.contents == '' || !collections.title"
          class="btn--sm btnPrimary"
        >
           저장
        </button>

      </div>

    </div>

    <!-- 삭제 확인용 모달 -->

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
import add_link from "@/assets/icon/addLink.svg";
import minus from "@/assets/icon/minus.svg";
import { fetchMyCategory } from "@/api/user";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";
import { deleteCollection } from "@/api/collection";
import { updateCollection } from "@/api/collection";
import ConfirmModalComponent from "@/components/modal/ConfirmModalComponent.vue";

export default {
  components: { AlertModalComponent, ConfirmModalComponent },

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
      // 경고 모달
      isAlertModalActive: false,
      alertModalContent: "",
      btnMessage: "네",
      // 삭제 경고 모달
      isDeleteModalActive: false,
      leftBtnMessage: "네",
      rightBtnMessage: "아니요",
      confirmModalContent: "해당 콜렉션을 \n삭제하시겠습니까?",
      categoryName: "",
      collections: {},
    };
  },
  props: {
    // collectionData: [],
    collectionId: Number,
  },
  async created() {
    this.getMyCategory();
    // this.collections = this.collectionData;
    await this.$store.dispatch("GET_COLLECTIONS");
    this.collections = this.$store.getters.getCollections.filter(
      (data) => data.id == this.collectionId
    );
    this.collections = this.collections[0];
    if (this.collections.category == null) {
      this.categoryName = "";
    } else if (this.collections.category !== null) {
      this.categoryName = this.collections.category.name;
    }
  },
  methods: {
    addFavorites() {
      this.collections.favorite = !this.collections.favorite;
    },
    // 자신의 카테고리 조회
    async getMyCategory() {
      try {
        const response = await fetchMyCategory();
        this.myCategories = response.data.categories;
      } catch (error) {
        console.log(error);
      }
    },
    // 인풋 추가 이벤트
    createInput(index) {
      const arr = { link: "" };
      this.collections.contents.push(arr);
      console.log(index);
    },
    // 인풋 삭제 이벤트
    deleteInput(index) {
      this.collections.contents.splice(index, 1);
    },
    // 콜렉션 수정
    async editCollection() {
      const linkList = this.collections.contents;
      const newLinkList = linkList.map((a) => a.link);
      console.log(newLinkList);
      console.log("콜렉션 수정 - 링크 목록");
      const collectionData = {
        title: this.collections.title,
        comment: this.collections.comment,
        favorite: this.collections.favorite,
        categoryName: this.categoryName,
        contentLinkList: newLinkList,
        collectionId: this.collections.id,
      };

      Object.keys(collectionData).forEach((key) => {
        if (key !== "favorite")
          (collectionData[key] == "" || collectionData[key] == undefined) &&
            delete collectionData[key];
      });
      try {
        const response = await updateCollection(collectionData);
        console.log(response);
        this.$emit("close-modal");
        console.log(" 최종 보낼 값", collectionData);
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 콜렉션 삭제
    async deleteCollection() {
      this.isDeleteModalActive = false;
      try {
        const response = await deleteCollection(this.collections.id);
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

