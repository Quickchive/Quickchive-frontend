<template>
  <div>
    <category-list-favorite
      @toCategoryPage="toFavoriteCategoryPage()"
    ></category-list-favorite>

    <div class="contents__wrapper-wrap">
      <category-list-all
        @toCategoryPage="toCategoryPage()"
        :categoryTitle="categoryAll"
      ></category-list-all>

      <category-list
        v-for="(category, index) in myCategories"
        :key="index"
        :categoryTitle="category.name"
        :categoryId="category.id"
      ></category-list>

      <button @click="openCategoryModal" class="btn__addCategory">
        + Add category
      </button>
    </div>

    <!-- 카테고리 추가 모달 컴포넌트 -->

    <category-modal-component
      v-show="isCategoryModalActive"
      @close-modal="isCategoryModalActive = false"
      :categoryModalTitle="categoryModalTitle"
      @categoryEvent="categoryEvent"
      :categoryName="categoryName"
    ></category-modal-component>

    <div class="main-btn__wrapper-col">
      <button @click="backToTop()" class="btn--transparent btn__top">
        <img :src="topBtn" />
      </button>

      <button @click="isModalActive = true" class="btn__addContents">
        <img :src="plusBtn" />
      </button>
    </div>

    <!-- 콘텐츠 추가 모달 컴포넌트 -->

    <contents-modal-component
      v-if="isModalActive"
      @close-modal="isModalActive = false"
      @isLinkNotSingle="isLinkNotSingle"
      :linkList="linkList"
    ></contents-modal-component>

    <!-- 링크 2개 이상일 경우 모달 컴포넌트 -->

    <confirm-modal-component
      v-if="isConfirmModalActive"
      @rightBtn="addMultipleContents()"
      @close-modal="isConfirmModalActive = false"
      :confirmModalContent="confirmModalContent"
      :leftBtnMessage="leftBtnMessage"
      :rightBtnMessage="rightBtnMessage"
      :isCloseBtnShow="isClosBtnShow"
      :linkList="linkList"
    ></confirm-modal-component>

    <!-- 중복 링크일 경우 모달 컴포넌트 -->

    <alert-modal-component
      v-if="isAlertModalActive"
      @confirmBtn="isAlertModalActive = false"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
    >
    </alert-modal-component>
  </div>
</template>

<script>
import CategoryListFavorite from '@/components/categorylist/CategoryListFavorite.vue';
import CategoryListAll from '@/components/categorylist/CategoryListAll.vue';
import CategoryList from '@/components/categorylist/CategoryList.vue';
import CategoryModalComponent from './modal/CategoryModalComponent.vue';
import plusBtn from '@/assets/icon/plusBtn.svg';
import topBtn from '@/assets/icon/topBtn.svg';
import ContentsModalComponent from './modal/ContentsModalComponent.vue';
import ConfirmModalComponent from '@/components/modal/ConfirmModalComponent.vue';
import AlertModalComponent from './modal/AlertModalComponent.vue';
import { addMultipleContents } from '@/api/contents';
import { addCategory } from '@/api/category';

export default {
  components: {
    CategoryListFavorite,
    CategoryListAll,
    CategoryList,
    ContentsModalComponent,
    CategoryModalComponent,
    ConfirmModalComponent,
    AlertModalComponent,
  },
  data() {
    return {
      isCategoryModalActive: false,
      plusBtn,
      isModalActive: false,
      isConfirmModalActive: false,
      isAlertModalActive: false,
      topBtn,
      // confirm 모달 메시지
      confirmModalContent: 'URL이 2개 이상이네요! \n 저장방식을 선택해주세요',
      leftBtnMessage: '콜렉션으로 저장',
      rightBtnMessage: '각각 콘텐츠로 저장',
      isClosBtnShow: true,
      // alert 모달 메시지
      alertModalContent: '같은 카테고리에 동일 링크가 \n 이미 저장되었습니다.',
      btnMessage: '네',
      contentsLinks: [],
      // 카테고리 모달 제목
      categoryModalTitle: '카테고리 추가',
      categoryName: '',
      // 내 카테고리 목록
      myCategories: {},
      categoryAll: '전체',
      linkList: [],
    };
  },
  async created() {
    await this.$store.dispatch('GET_CATEGORIES');
    this.myCategories = this.$store.getters.getCategories;
  },
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
  },
  methods: {
    // 카테고리 추가 모달 열기
    openCategoryModal() {
      this.isCategoryModalActive = true;
    },
    // 카테고리 추가 이벤트
    async categoryEvent(categoryName) {
      this.categoryName = categoryName;
      this.isCategoryModalActive = false;
      try {
        const data = {
          categoryName: this.categoryName,
        };
        await addCategory(data);
        await this.$store.dispatch('GET_CATEGORIES');
        this.myCategories = this.$store.getters.getCategories;
      } catch (error) {
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },

    // 콘텐츠 추가 모달 열기
    addContents() {
      this.isModalActive = true;
    },
    // 탑 버튼
    backToTop() {
      window.scrollTo(0, 0);
    },
    isLinkNotSingle(linkList) {
      this.linkList = linkList;
      this.isModalActive = false;
      this.isConfirmModalActive = true;
    },
    // 다수의 콘텐츠 추가 메소드
    async addMultipleContents() {
      this.isConfirmModalActive = false;
      const contentsData = {
        contentLinks: this.linkList,
      };
      try {
        await addMultipleContents(contentsData);
      } catch (error) {
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 카테고리 상세 페이지로 이동
    toCategoryPage(id) {
      this.$router.push(`/category/${id}`);
    },
    // 즐겨찾기 상세 페이지로 이동
    toFavoriteCategoryPage() {
      this.$router.push(`/category/favorite`);
    },
  },
};
</script>

<style></style>
