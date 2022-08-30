<template>
  <div class="collection-component">
    <div class="collection__wrapper-col">
      <span class="collection-tag">Collection</span>
      <p class="collection__title">{{ collectionData.title }}</p>
      <div class="collection__lists-wrapper">
        <div>
          <ul
            v-for="(list, index) in collectionData.lists"
            :key="index"
            class="collection__lists"
          >
            <li class="collection__list" v-if="index <= 3">{{ list }}</li>
          </ul>
        </div>

        <div
          v-for="(list, index) in collectionData.lists"
          :key="index"
          class="collection__list-num"
        >
          <span v-if="index > 3"
            >외 {{ collectionData.lists.length - index }}개</span
          >
        </div>
      </div>
      <div class="collection__btn-wrapper">
        <button class="btn--transparent"><img :src="memo" /></button>
        <img :src="category_line" />
        <button class="btn--transparent">
          <img :src="star" v-show="collectionData.favorites" /><img
            :src="star_border"
            v-show="!collectionData.favorites"
          />
        </button>
      </div>
    </div>
    <div class="collection__wrapper">
      <!-- 이미지 -->
      <div class="collection__img">
        <div class="collection__num">+{{ collectionData.lists.length }}</div>
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
      star_border,
      category_line,
    };
  },
  props: {
    collectionData: Object,
  },
};
</script>

<style></style>
