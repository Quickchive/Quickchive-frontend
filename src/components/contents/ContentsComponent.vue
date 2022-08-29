<!-- 개별 콘텐츠 컴포넌트 -->
<template>
  <div class="contents-component">
    <div class="contents__wrapper-col">
      <p class="contents__title">{{ contentsData.title }}</p>
      <p class="contents__contents">{{ contentsData.contents }}</p>
      <div class="contents__inner">
        <p class="contents__domain">
          {{ contentsData.domain }} | {{ contentsData.date }}
        </p>
        <div class="contents__btn-wrapper">
          <button class="btn--transparent"><img :src="memo" /></button>
          <img :src="category_line" />
          <button class="btn--transparent">
            <img :src="star" v-show="contentsData.favorites" /><img
              :src="star_border"
              v-show="!contentsData.favorites"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="contents__wrapper">
      <!-- 이미지 -->
      <div class="contents__img">
        <div class="contents__expiryDate">D-{{ contentsData.expiryDate }}</div>
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
    contentsData: Object,
  },
};
</script>

<style></style>
