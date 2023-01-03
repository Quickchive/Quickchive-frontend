<template>
  <div class="category-view">
    <h1 class="page-header">
      {{ categoryName
      }}<button
        v-if="this.categoryName !== '미분류'"
        class="btn--transparent--img"
        @click="openCategoryModal()"
      >
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
      <div class="alert" v-if="this.newArr.length == 0">
        <h2>
          해당 카테고리에 속하는 콘텐츠가 없습니다😯
        </h2>
      </div>
      <div v-else>
        <!-- 콘텐츠 컴포넌트 -->
        <div v-for="(data, index) in newArr" :key="index">
          <contents-component
            :contents="data"
            v-if="!newArr[index].contents"
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

export default {
  components: {
    ContentsComponent,
    CategoryModalComponent,
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
      newArr: [],
      memoEvent: 0,
      contentsModalEvent: 0,
    };
  },
  watch: {
    async $route() {
      await this.fetchCategoryName();
      await this.$store.dispatch('GET_CONTENTS', this.$route.params.id);
      this.newArr = this.$store.getters.getContents;
    },
    async memoEvent() {
      await this.$store.dispatch('GET_CONTENTS', this.$route.params.id);
      this.newArr = this.$store.getters.getContents;
    },
    async contentsModalEvent() {
      await this.$store.dispatch('GET_CONTENTS', this.$route.params.id);
      this.newArr = this.$store.getters.getContents;
    },
  },
  async created() {
    this.categoryId = this.$route.params.id;
    await this.$store.dispatch('GET_CONTENTS', this.$route.params.id);
    this.newArr = this.$store.getters.getContents;
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
        console.log(error);
      }
    },
    // 카테고리 이름 조회
    async fetchCategoryName() {
      try {
        const response = await getMyCategory();
        const categoryId = this.$route.params.id;
        const categories = response.data.categories;
        if (categoryId == -1) {
          this.categoryName = '미분류';
        } else {
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
      // 최신순
      if (filter == 'favorites') {
        this.newArr = sortDataByFavorite(this.$store.getters.getContents);
      } else if (filter == 'latest') {
        this.newArr = sortDataByRecentlySaved(this.$store.getters.getContents);
      } else if (filter == 'expiry') {
        this.newArr = sortDataByImminentDeadline(
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
