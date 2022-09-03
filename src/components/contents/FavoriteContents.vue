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
    <!-- 즐겨찾기 목록 -->
    <div v-if="contentState" class="favorite-lists">
      <div
        v-for="(favorite, index) in favoritesList"
        :key="index"
        class="favorite-list"
      >
        <!-- 1. wrapper -->
        <div class="favorite-list__wrapper">
          <div class="favorite-list__img-wrapper">
            <!-- 이미지 -->
            <div class="favorite-list__img">
              <span v-if="favorite.deadline" class="favorite-list__expiry"
                >D-{{ countDday(favorite.deadline) }}</span
              >
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
            </div>
            <!-- 메모 -->
          </div>
        </div>
        <!-- 2. wrapper -->
        <div class="favorite-list__wrapper">
          <!-- 제목 -->
          <p class="favorite-list__title">{{ filterTitle(favorite.title) }}</p>
          <div class="favorite-list__inner">
            <!-- 도메인 -->
            <span class="favorite-list__domain">{{
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
    <memo-modal-component
      v-if="isMemoModalActive"
      @close-modal="isMemoModalActive = false"
      :memoContents="memoContents"
    ></memo-modal-component>
  </div>
</template>

<script>
import plus from "@/assets/icon/plus.svg";
import minus from "@/assets/icon/minus.svg";
import line from "@/assets/icon/line.svg";
import line_white from "@/assets/icon/line_white.svg";
import memo from "@/assets/icon/memo.svg";
import star from "@/assets/icon/star.svg";
import star_gray from "@/assets/icon/star_gray.svg";
import MemoModalComponent from "@/components/modal/MemoModalComponent.vue";
import { addFavorite } from "@/api/contents";
import { countDday } from "@/utils/validation";
import { fetchMyFavorites } from "@/api/user";

export default {
  components: { MemoModalComponent },
  data() {
    return {
      plus,
      minus,
      line,
      line_white,
      memo,
      star,
      star_gray,
      contentState: false,
      isMemoModalActive: false,
      favoritesList: [
        // 더미데이터(테스트용)
        {
          title: "제목",
          createdAt: "2022-09-09",
          link: "http://naver.com",
          favorite: true,
          comment: "메모",
          deadline: "2022-09-28",
        },
        {
          title: "제목",
          createdAt: "2022-09-09",
          link: "http://naver.com",
          favorite: false,
          comment: "메모",
          deadline: "2022-09-28",
        },
        {
          title: "제목",
          createdAt: "2022-09-09",
          link: "http://naver.com",
          favorite: true,
          comment: "메모",
        },
        {
          title: "제목",
          createdAt: "2022-09-09",
          link: "http://naver.com",
          favorite: true,
          comment: "메모",
        },
        {
          title: "제목",
          createdAt: "2022-09-09",
          link: "http://naver.com",
          favorite: true,
          comment: "메모",
        },
        {
          title: "제목",
          createdAt: "2022-09-09",
          link: "http://naver.com",
          favorite: true,
          comment: "메모",
        },
        {
          title:
            "제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목v제목제목제목제목",
          createdAt: "2022-09-09",
          link: "http://youtube.com",
          favorite: false,
          comment: "메모",
        },
        {
          title: "제목",
          createdAt: "2022-09-09",
          link: "http://naver.com",
          favorite: true,
          comment: "메모",
        },
        {
          title: "제목",
          createdAt: "2022-09-09",
          link: "http://www.youtube.com",
          favorite: true,
          comment: "메모",
        },
      ],
    };
  },
  created() {
    this.fetchFavoritesList();
  },
  methods: {
    showContent() {
      this.contentState = !this.contentState;
      this.fetchFavoritesList();
    },
    // 즐겨찾기 생성
    async createFavorites(index) {
      console.log("인덱스", index);
      this.contentsList[index].favorite = !this.contentsList[index].favorite;
      try {
        const contentId = this.contentsList[index].id;
        const response = await addFavorite(contentId);
        console.log(response);
        // 즐겨찾기 리스트 갱신
        this.fetchFavoritesList();
      } catch (error) {
        console.log(error);
      }
    },
    // 나의 즐겨찾기 리스트 조회
    async fetchFavoritesList() {
      try {
        const response = await fetchMyFavorites();
        this.favoritesList = response.data.favorites;
        console.log("콘텐츠 데이터", this.favoritesList);
      } catch (error) {
        console.log(error);
      }
    },
    // 메모 모달 열기
    openMemoModal(index) {
      this.isMemoModalActive = true;
      this.memoContents = this.favoritesList[index].comment;
    },
    // 제목 글자수 30자 이상
    filterTitle(title) {
      if (title.length >= 20) {
        return title.substr(0, 20) + "...";
      } else {
        return title;
      }
    },
    toLink(link) {
      window.open(link, "_blank");
    },
    // 도메인 추출
    filterDomain(link) {
      // let link = this.favoritesList[index].link;
      let domain;
      if (link.includes("www") == true) {
        let domain1 = link.split(".");
        domain1 = domain1[1];
        domain = domain1;
      } else {
        // domain = domain[1];
        let pos1 = link.indexOf("//");
        let pos2 = link.substring(pos1 + 2);
        domain = pos2.split(".");
        domain = domain[0];
        // console.log(domain[1]);
      }
      return domain;
    },
    countDday(deadline) {
      console.log(countDday(deadline));
      return countDday(deadline);
    },
    // 카테고리 상세 페이지로 이동
    toCategoryPage() {
      this.$emit("toCategoryPage");
    },
  },
};
</script>

<style></style>
