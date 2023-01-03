<template>
  <div class="favorite-content">
    <header>
      <div @click="toCategoryPage()" class="favorite-content__header-wrapper">
        <h3>즐겨찾기</h3>
        <img :src="star" />
      </div>
      <button @click="showContent()">
        <img v-if="!contentState" :src="plus" />
        <img v-if="contentState" :src="minus" />
      </button>
    </header>
    <!-- 즐겨찾기 콘텐츠 목록 -->
    <div
      v-if="favoriteContent.length > 0"
      class="favorite-lists"
      :class="[contentState ? 'favoriteExtend' : 'favoriteDefault']"
    >
      <div v-for="(favorite, index) in favoriteContent" :key="index">
        <div class="favorite-list" v-if="!favorite.contents">
          <!-- 1. wrapper -->
          <div class="favorite-list__wrapper">
            <div class="favorite-list__img-wrapper">
              <!-- 이미지 -->
              <div class="favorite-list__img">
                <img
                  :src="favorite.coverImg"
                  onerror="this.style.display='none'"
                  v-if="favorite.coverImg.length > 0"
                />
                <img :src="defaultImg" v-else class="defaultImg" />

                <span v-if="favorite.deadline" class="favorite-list__expiry">{{
                  countDday(favorite.deadline)
                }}</span>
              </div>
              <div class="favorite-list__btn-wrapper">
                <button class="btn--transparent" @click="openMemoModal(index)">
                  <img :src="memo" />
                </button>
                <img :src="line_white" />
                <!-- 즐겨찾기 -->
                <button
                  class="btn--transparent"
                  @click="createFavorites(index)"
                >
                  <img v-if="favorite.favorite" :src="star" />
                  <img v-if="!favorite.favorite" :src="star_gray" />
                </button>
              </div>
              <!-- 메모 -->
            </div>
          </div>
          <!-- 2. wrapper -->
          <div class="favorite-list__wrapper-text">
            <!-- 제목 -->
            <p @click="toLink(favorite.link)" class="favorite-list__title">
              {{ filterTitle(favorite.title) }}
            </p>
            <div class="favorite-list__inner">
              <!-- 도메인 -->
              <span class="favorite-list__domain" v-if="favorite.link">{{
                filterDomain(favorite.link)
              }}</span>
              <img :src="line" />
              <!-- 날짜 -->
              <span class="favorite-list__date">{{
                favorite.createdAt.substr(0, 10)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <memo-modal-component
      v-if="isMemoModalActive"
      @close-modal="isMemoModalActive = false"
      :memoContents="memoContents"
      :contentsId="contentsId"
    ></memo-modal-component>
  </div>
</template>

<script>
import plus from '@/assets/icon/plus.svg';
import minus from '@/assets/icon/minus.svg';
import line from '@/assets/icon/line.svg';
import line_white from '@/assets/icon/line_white.svg';
import memo from '@/assets/icon/memo.svg';
import star from '@/assets/icon/star.svg';
import star_gray from '@/assets/icon/star_gray.svg';
import MemoModalComponent from '@/components/modal/MemoModalComponent.vue';
import { addFavorite } from '@/api/contents';
import { calculateDeadline } from '@/utils/date';
import defaultImg from '@/assets/img/favoriteDefault.svg';

export default {
  components: { MemoModalComponent },
  data() {
    return {
      plus,
      minus,
      line,
      line_white,
      memo,
      defaultImg,
      star,
      star_gray,
      contentState: false,
      isMemoModalActive: false,
    };
  },
  async created() {
    await this.$store.dispatch('GET_FAVORITES');
  },
  computed: {
    favoriteContent() {
      return this.$store.getters.getLatestSortedFavorite;
    },
  },
  methods: {
    async showContent() {
      this.contentState = !this.contentState;
      await this.$store.dispatch('GET_FAVORITES');
    },
    // 즐겨찾기 생성
    async createFavorites(index) {
      this.favoriteContent[index].favorite = !this.favoriteContent[index]
        .favorite;
      try {
        const contentId = this.favoriteContent[index].id;
        await addFavorite(contentId);
        // 즐겨찾기 리스트 갱신
        this.$store.dispatch('GET_FAVORITES');
        this.$store.dispatch('SORT_DATA');
      } catch (error) {
        console.log(error);
      }
    },
    // 메모 모달 열기
    async openMemoModal(index) {
      await this.$store.dispatch('GET_FAVORITES');
      this.favoriteContent = this.$store.getters.getLatestSortedFavorite;
      this.memoContents = this.favoriteContent[index].comment;
      this.contentsId = this.favoriteContent[index].id;
      this.isMemoModalActive = true;
    },
    // 제목 글자수 30자 이상
    filterTitle(title) {
      if (title.length >= 20) {
        return title.substr(0, 20) + '...';
      } else {
        return title;
      }
    },
    toLink(link) {
      window.open(link, '_blank');
    },
    // 도메인 추출
    filterDomain(link) {
      let domain;
      if (link.includes('www') == true) {
        let domain1 = link.split('.');
        domain1 = domain1[1];
        domain = domain1;
      } else {
        let pos1 = link.indexOf('//');
        let pos2 = link.substring(pos1 + 2);
        domain = pos2.split('.');
        domain = domain[0];
      }
      return domain;
    },
    countDday(deadline) {
      return calculateDeadline(deadline);
    },
    // 카테고리 상세 페이지로 이동
    toCategoryPage() {
      this.$emit('toCategoryPage');
    },
  },
};
</script>

<style></style>
