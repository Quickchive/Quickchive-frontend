<template>
  <div class="all-content">
    <header>
      <h3>{{ categoryTitle }}</h3>
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
          <button class="btn--transparent">
            <img :src="memo" />
          </button>
          <button class="btn--transparent" @click="createFavorites(index)">
            <img v-if="content.isFavoriteContent" :src="star" />
            <img v-if="!content.isFavoriteContent" :src="star_gray" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import plus from "@/assets/icon/plus.svg";
import minus from "@/assets/icon/minus.svg";
import line from "@/assets/icon/line.svg";
import memo from "@/assets/icon/memo.svg";
import star from "@/assets/icon/star.svg";
import star_gray from "@/assets/icon/star_gray.svg";

export default {
  data() {
    return {
      plus,
      minus,
      line,
      memo,
      star,
      star_gray,
      contentState: false,
      // 더미 데이터
      contents: [
        {
          icon: "링크",
          title: "콘텐츠 제목1",
          expiryDate: "D-2",
          isFavoriteContent: false,
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
  },
};
</script>

<style></style>
