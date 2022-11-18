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
            <input
              v-model="collectionData.title"
              placeholder="10자 이하 권장"
            />
          </div>
          <div class="register-form__wrapper category__wrapper">
            <label class="register-form__label">카테고리</label>
            <select v-model="categoryName" class="contents-modal__select">
              <option value="">카테고리 선택</option>
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
              <img v-show="!collectionData.favorite" :src="star_border" />
              <img v-show="collectionData.favorite" :src="star" />
            </button>
          </div>
        </div>

        <!-- 콜렉션 설명 -->
        <div class="register-form__wrapper">
          <label class="register-form__label">콜렉션 설명</label>
          <input
            v-model="collectionData.comment"
            placeholder="100자 이하"
            maxlength="100"
          />
        </div>

        <!-- 링크 -->
        <div class="register-form__wrapper">
          <label class="register-form__label">링크<em>*</em></label>
          <div class="link__wrapper">
            <div
              v-for="(content, index) in this.collectionData.contentLinkList"
              :key="index"
              class="link__wrapper-inner"
            >
              <div class="link__index">{{ index + 1 }}</div>
              <input
                v-model="collectionData.contentLinkList[index]"
                placeholder="URL 입력"
              />
              <button
                v-if="collectionData.contentLinkList.length != 1"
                @click="deleteInput(index)"
                class="btn--transparent btn__deleteLink"
              >
                <img :src="minus" />
              </button>
            </div>
          </div>
          <div class="flex-container-col modal-card__btn__wrapper">
            <button @click="createInput()" class="btn--transparent btn--plus">
              <img :src="add_link" />
            </button>
          </div>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="flex-container-col modal-card__btn__wrapper">
        <button
          @click="createCollection()"
          :disabled="
            collectionData.contentLinkList == '' || !collectionData.title
          "
          class="btn--sm btnPrimary"
        >
          저장
        </button>
      </div>
    </div>

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
import closeBtn from '@/assets/icon/closeBtn.svg';
import star_border from '@/assets/icon/star_border.svg';
import star from '@/assets/icon/star.svg';
import alert_circle from '@/assets/icon/alert-circle.svg';
import add_link from '@/assets/icon/addLink.svg';
import minus from '@/assets/icon/minus.svg';
import AlertModalComponent from '@/components/modal/AlertModalComponent.vue';
import { addCollection } from '@/api/collection';

export default {
  components: { AlertModalComponent },

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
      alertModalContent: '',
      btnMessage: '네',
      // 삭제 경고 모달
      isDeleteModalActive: false,
      deleteModalContent: '해당 콜렉션을 \n삭제하시겠습니까?',
      // 폼 항목
      categoryName: '',
    };
  },
  props: {
    collectionData: {
      type: Object,
      default: () => ({ contentLinkList: ['1', '2'] }),
    },
  },
  async created() {
    await this.$store.dispatch('GET_CATEGORIES');
    this.myCategories = this.$store.getters.getCategories;
  },
  methods: {
    addFavorites() {
      this.collectionData.favorite = !this.collectionData.favorite;
    },

    // 인풋 추가 이벤트
    createInput() {
      this.collectionData.contentLinkList.push('');
    },
    // 인풋 추가 이벤트
    deleteInput(index) {
      this.collectionData.contentLinkList.splice(index, 1);
    },
    // 콜렉션 추가
    async createCollection() {
      const collectionData = {
        title: this.collectionData.title,
        comment: this.collectionData.comment,
        categoryName: this.categoryName,
        contentLinkList: this.collectionData.contentLinkList.filter(function(
          item
        ) {
          return item !== null && item !== undefined && item !== '';
        }),
        favorite: this.collectionData.favorite,
      };
      Object.keys(collectionData).forEach(
        (key) =>
          (collectionData[key] == '' || collectionData[key] == undefined) &&
          delete collectionData[key]
      );
      try {
        await addCollection(collectionData);
        this.$emit('close-modal');
      } catch (error) {
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      } finally {
        this.collectionData.title = '';
        this.collectionData.comment = '';
        this.collectionData.contentsLinkList = '';
        this.collectionData.categoryName = '';
        this.collectionData.favorite = false;
      }
    },
  },
};
</script>

<style></style>
