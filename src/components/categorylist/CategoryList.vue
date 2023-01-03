<template>
  <div class="all-content">
    <header>
      <div @click="toCategoryPage()" class="content__header">
        <h3>{{ filterCategoryTitle(categoryTitle) }}</h3>
      </div>
      <button @click="showContent()">
        <img v-if="!contentState" :src="plus" />
        <img v-if="contentState" :src="minus" />
      </button>
    </header>
    <!-- 콘텐츠 목록 -->
    <div class="contents-lists" v-if="contentState && contents.length > 0">
      <div v-for="(data, index) in contents" :key="index">
        <div class="contents-list" v-if="!data.contents">
          <div class="contents-list__wrapper">
            <button class="btn--transparent--img" @click="toLink(data.link)">
              <span class="contents-list__icon"><img :src="web"/></span>
              <span class="contents-list__title">
                {{ filterTitle(data.title) }}
              </span>
            </button>
          </div>
          <div class="contents-list__wrapper">
            <img :src="line" />
            <span v-if="data.deadline" class="contents-list__expiry">{{
              countDday(data.deadline)
            }}</span>
            <button class="btn--transparent" @click="openMemoModal(index)">
              <img :src="memo" />
            </button>
            <button class="btn--transparent" @click="createFavorites(index)">
              <img v-if="data.favorite" :src="star" />
              <img v-if="!data.favorite" :src="star_gray" />
            </button>
          </div>
        </div>
        <memo-modal-component
          v-if="isMemoModalActive"
          @close-modal="isMemoModalActive = false"
          :contentsId="contentsId"
          :memoContents="memoContents"
        ></memo-modal-component>
      </div>
    </div>
  </div>
</template>

<script>
import plus from '@/assets/icon/plus.svg';
import minus from '@/assets/icon/minus.svg';
import line from '@/assets/icon/line.svg';
import memo from '@/assets/icon/memo.svg';
import star from '@/assets/icon/star.svg';
import star_gray from '@/assets/icon/star_gray.svg';
import web from '@/assets/icon/web.svg';
import MemoModalComponent from '@/components/modal/MemoModalComponent.vue';
import { calculateDeadline } from '@/utils/date';
import { addFavorite } from '@/api/contents';

export default {
  components: { MemoModalComponent },
  data() {
    return {
      plus,
      minus,
      line,
      memo,
      star,
      star_gray,
      web,
      contentState: false,
      isMemoModalActive: false,
      memoContents: '',
      contentsId: 0,
    };
  },
  props: {
    categoryTitle: String,
    categoryId: Number,
  },
  computed: {
    contents() {
      return this.$store.getters.getContents;
    },
  },
  methods: {
    async showContent() {
      await this.$store.dispatch('GET_CONTENTS', this.categoryId);
      this.contents = this.$store.getters.getContents;
      this.contentState = !this.contentState;
    },
    // 즐겨찾기 생성 - 콘텐츠
    async createFavorites(index) {
      this.contents[index].favorite = !this.contents[index].favorite;
      try {
        const contentId = this.contents[index].id;
        await addFavorite(contentId);
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 상세 페이지로 이동
    toCategoryPage() {
      this.$router.push(`/category/${this.categoryId}`);
    },
    // 메모 모달 열기
    async openMemoModal(index) {
      await this.$store.dispatch('GET_CONTENTS', this.categoryId);
      this.contents = this.$store.getters.getContents;
      this.memoContents = this.contents[index].comment;
      this.contentsId = this.contents[index].id;
      this.isMemoModalActive = true;
    },
    // 제목 글자수 30자 이상
    filterTitle(title) {
      if (title.length >= 30) {
        return title.substr(0, 30) + '...';
      } else {
        return title;
      }
    },
    countDday(deadline) {
      return calculateDeadline(deadline);
    },
    toLink(link) {
      window.open(link, '_blank');
    },
    // 제목 글자수 10자 이상
    filterCategoryTitle(title) {
      if (title.length >= 10) {
        return title.substr(0, 10) + '...';
      } else {
        return title;
      }
    },
  },
};
</script>

<style></style>
