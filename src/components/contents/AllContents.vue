<template>
  <div class="all-content">
    <header>
      <div @click="toCategoryPage()" class="content__header">
        <h3>{{ categoryTitle }}</h3>
      </div>
      <button @click="showContent()">
        <img v-if="!contentState" :src="plus" />
        <img v-if="contentState" :src="minus" />
      </button>
    </header>
    <!-- 콘텐츠 목록 -->
    <div v-show="contentState" class="contents-lists">
      <div
        v-for="(content, index) in contents"
        :key="index"
        class="contents-list"
      >
        <div class="contents-list__wrapper">
          <span class="contents-list__icon">
            {{ content.icon }}
          </span>
          <span class="contents-list__title">
            {{ content.title }}
          </span>
        </div>
        <div class="contents-list__wrapper">
          <img :src="line" />
          <span class="contents-list__expiry">{{ content.expiryDate }}</span>
          <button class="btn--transparent" @click="openMemoModal()">
            <img :src="memo" />
          </button>
          <button class="btn--transparent" @click="createFavorites(index)">
            <img v-if="content.favorite" :src="star" />
            <img v-if="!content.favorite" :src="star_gray" />
          </button>
        </div>
      </div>
    </div>
    <memo-modal-component
      v-if="isMemoModalActive"
      @close-modal="isMemoModalActive = false"
    ></memo-modal-component>
  </div>
</template>

<script>
import plus from "@/assets/icon/plus.svg";
import minus from "@/assets/icon/minus.svg";
import line from "@/assets/icon/line.svg";
import memo from "@/assets/icon/memo.svg";
import star from "@/assets/icon/star.svg";
import star_gray from "@/assets/icon/star_gray.svg";
import { fetchMyContents } from "@/api/user";
import MemoModalComponent from "@/components/modal/MemoModalComponent.vue";

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
      contentState: false,
      isMemoModalActive: false,
      // 더미 데이터
      contents: [
        {
          icon: "링크",
          title: "콘텐츠 제목1",
          expiryDate: "D-2",
          favorite: false,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          favorite: true,
        },
        {
          icon: "웹",
          title: "콘텐츠 제목2",
          expiryDate: "D-3",
          isFavoriteContent: true,
        },
      ],
    };
  },
  props: {
    categoryTitle: String,
  },

  methods: {
    showContent() {
      this.contentState = !this.contentState;
    },
    // 즐겨찾기 생성
    createFavorites(index) {
      console.log("인덱스", index);
      this.contents[index].isFavoriteContent =
        !this.contents[index].isFavoriteContent;
    },
    // 카테고리 상세 페이지로 이동
    toCategoryPage() {
      this.$emit("toCategoryPage");
    },
    // 나의 콘텐츠 조회 (카테고리 아이디 받아서 조회하기)
    async fetchContentsList() {
      const categoryId = this.$route.params.id;
      console.log("카테고리 id", categoryId);
      try {
        const response = await fetchMyContents(categoryId);
        // 콘텐츠 컴포넌트에 데이터 전달
        this.contents = response.data.contents;
        console.log("콘텐츠 데이터", this.contentsData);
      } catch (error) {
        console.log(error);
      }
    },
    // 메모 모달 열기
    openMemoModal() {
      this.isMemoModalActive = true;
    },
  },
};
</script>

<style></style>
