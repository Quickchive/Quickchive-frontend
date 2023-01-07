<template>
  <div class="category-view">
    <h1 class="page-header" v-if="this.categoryName === ''">전체</h1>
    <h1 class="page-header" v-else>
      {{ categoryName
      }}<button class="btn--transparent--img" @click="openCategoryModal()">
        <img :src="setting" />
      </button>
    </h1>
    <div>
      <div class="category__select-wrapper">
        <select v-model="categoryFilter" @change="sortData(categoryFilter)">
          <option value="latest">최신순</option>
          <option value="favorites">즐겨찾기순</option>
          <option value="expiry">읽을기한순</option>
        </select>
      </div>
      <div class="alert" v-if="!this.$store.getters.getContents">
        <h2>
          아직 콘텐츠가 없습니다😯
        </h2>
      </div>
      <div v-else>
        <!-- 콘텐츠 컴포넌트 -->
        <div v-for="(data, index) in contents" :key="index">
          <contents-component
            :contents="data"
            v-if="!contents[index].contents"
          ></contents-component>
        </div>
      </div>
    </div>
    <!-- 카테고리 수정 모달 컴포넌트 -->
    <category-modal-component
      v-show="isCategoryModalActive"
      @close-modal="isCategoryModalActive = false"
      :categoryModalTitle="categoryModalTitle"
      @categoryEvent="categoryEvent"
      :categoryName="newCategoryName"
      @deleteCategory="deleteCategory"
      :deleteBtn="deleteBtn"
    ></category-modal-component>
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
import setting from '@/assets/icon/settings.svg';
import ContentsComponent from '@/components/content/ContentsComponent.vue';
import CategoryModalComponent from '@/components/modal/CategoryModalComponent.vue';
import { updateCategory, deleteCategory } from '@/api/category';
import { getMyCategory } from '@/api/user';
import {
  sortDataByRecentlySaved,
  sortDataByFavorite,
  sortDataByImminentDeadline,
} from '@/utils/sort';
import { eventBus } from '@/main';
import AlertModalComponent from '@/components/modal/AlertModalComponent.vue';

export default {
  components: {
    ContentsComponent,
    CategoryModalComponent,
    AlertModalComponent,
  },
  data() {
    return {
      isCategoryModalActive: false,
      categoryModalTitle: '카테고리 수정',
      categoryFilter: 'latest',
      setting,
      categoryId: '',
      categoryName: '',
      newCategoryName: '',
      deleteBtn: '카테고리 삭제',
      contents: [],
      memoEvent: 0,
      contentsModalEvent: 0,
      isAlertModalActive: false,
      alertModalContent: '',
      btnMessage: '확인',
    };
  },
  watch: {
    async $route() {
      await this.fetchCategoryName();
      await this.$store.dispatch('GET_CONTENTS', this.$route.params.id);
      this.contents = this.$store.getters.getContents;
    },
    async memoEvent() {
      await this.$store.dispatch('GET_CONTENTS', this.$route.params.id);
      this.contents = this.$store.getters.getContents;
    },
    async contentsModalEvent() {
      await this.$store.dispatch('GET_CONTENTS', this.$route.params.id);
      this.contents = this.$store.getters.getContents;
    },
  },
  async created() {
    this.categoryId = this.$route.params.id;
    await this.$store.dispatch('GET_CONTENTS', this.$route.params.id);
    this.contents = this.$store.getters.getContents;
    await this.fetchCategoryName();
    eventBus.$on('memoEvent', (data) => (this.memoEvent += data));
    eventBus.$on(
      'contentsModalActive',
      (data) => (this.contentsModalEvent += data)
    );
  },
  methods: {
    // 카테고리 추가 모달 열기
    openCategoryModal() {
      this.isCategoryModalActive = true;
    },
    // 카테고리 수정
    async categoryEvent(newCategoryName) {
      this.newCategoryName = newCategoryName;
      try {
        const categoryData = {
          name: this.newCategoryName,
          originalName: this.categoryName,
        };
        await updateCategory(categoryData);
        this.categoryName = this.newCategoryName;
        this.isCategoryModalActive = false;
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 삭제
    async deleteCategory() {
      try {
        await deleteCategory(this.categoryId);
        this.isCategoryModalActive = false;
        this.$router.push('/category/all');
      } catch (error) {
        this.alertModalContent = error.message;
        this.isAlertModalActive = true;
      }
    },
    // 카테고리 이름 조회
    async fetchCategoryName() {
      try {
        const response = await getMyCategory();
        const categoryId = this.$route.params.id;
        const categories = response.data.categories;
        {
          const categoryFilter = categories.filter(function(cate) {
            return cate.id == categoryId;
          });
          this.categoryName = categoryFilter[0].name;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 정렬
    async sortData(filter) {
      if (filter === 'favorites') {
        this.contents = sortDataByFavorite(this.$store.getters.getContents);
      }
      if (filter === 'latest') {
        this.contents = sortDataByRecentlySaved(
          this.$store.getters.getContents
        );
      }
      if (filter === 'expiry') {
        this.contents = sortDataByImminentDeadline(
          this.$store.getters.getContents
        );
      }
    },
  },
};
</script>

<style>
.alert {
  padding: 50px 0;
  box-sizing: border-box;
  display: block;
}
</style>
