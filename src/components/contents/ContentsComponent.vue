<!-- 개별 콘텐츠 컴포넌트 -->
<template>
  <div @click="toLink(contents.link)" class="contents-component">
    <div class="contents__wrapper-col">
      <p class="contents__title">{{ contents.title }}</p>
      <p class="contents__contents">{{ contents.description }}</p>
      <div class="contents__inner">
        <p class="contents__domain">
          {{ contents.domain }} | {{ contents.createdAt.substring(0, 10) }}
        </p>
        <div class="contents__btn-wrapper">
          <button class="btn--transparent"><img :src="memo" /></button>
          <img :src="category_line" />
          <button class="btn--transparent">
            <img :src="star" v-show="contents.favorite" /><img
              :src="star_border"
              v-show="!contents.favorite"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="contents__wrapper">
      <!-- 이미지 -->
      <div class="contents__img">
        <div class="contents__expiryDate">D-{{ this.countDday }}</div>
      </div>
      <button class="btn--transparent"><img :src="edit" /></button>
    </div>
  </div>
</template>

<script>
import memo from "@/assets/icon/memo.svg";
import star from "@/assets/icon/star.svg";
import star_border from "@/assets/icon/star_border.svg";
import edit from "@/assets/icon/edit.svg";
import category_line from "@/assets/icon/category_line.svg";
import { countDday } from "@/utils/validation";

export default {
  data() {
    return {
      memo,
      star,
      edit,
      category_line,
      star_border,
    };
  },
  props: {
    contents: Object,
  },
  created() {
    console.log("콘텐츠컴포넌트 데이터", this.contents);
  },
  computed: {
    countDday() {
      console.log(countDday(this.contents.deadline));
      return countDday(this.contents.deadline);
    },
  },
  methods: {
    toLink(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style></style>
