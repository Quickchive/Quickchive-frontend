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

        <div v-if="collectionData.lists">
          <div
            v-for="(list, index) in collectionData.lists"
            :key="index"
            class="collection__list-num"
          >
            <span v-if="index == 4"
              >&nbsp;외 {{ collectionData.lists.length - index }}개</span
            >
          </div>
        </div>
      </div>
      <div class="collection__btn-wrapper">
        <button @click="openMemoModal()" class="btn--transparent">
          <img :src="memo" />
        </button>
        <img :src="category_line" />
        <button @click="createFavorites()" class="btn--transparent">
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
        <div v-if="collectionData.lists" class="collection__num">
          +{{ collectionData.lists.length }}
        </div>
      </div>
      <button class="btn--transparent"><img :src="edit" /></button>
    </div>
    <!-- 메모 모달 컴포넌트 -->
    <memo-modal-component
      v-if="isMemoModalActive"
      @close-modal="isMemoModalActive = false"
      :memoContents="memoContents"
    ></memo-modal-component>
  </div>
</template>

<script>
import memo from "@/assets/icon/memo.svg";
import star from "@/assets/icon/star.svg";
import star_border from "@/assets/icon/star_border.svg";
import edit from "@/assets/icon/edit.svg";
import category_line from "@/assets/icon/category_line.svg";
import MemoModalComponent from "@/components/modal/MemoModalComponent.vue";
import { addFavorite } from "@/api/contents";

export default {
  components: { MemoModalComponent },
  data() {
    return {
      memo,
      star,
      edit,
      star_border,
      category_line,
      isMemoModalActive: false,
      // 메모 모달
      memoContents: "",
      // collectionData: {
      //   title: "제목",
      //   lists: [
      //     "링크목록",
      //     "링크목록",
      //     "링크목록,",
      //     "링크목록,",
      //     "링크목록,",
      //     "링크목록,",
      //   ],
      //   comment: "설명",
      //   categoryName: "카테고리",
      //   favorites: true,
      // },
    };
  },
  props: {
    collectionData: Object,
  },
  methods: {
    openMemoModal() {
      this.isMemoModalActive = true;
      this.memoContents = this.collectionData.comment;
    },
    // 즐겨찾기 생성
    async createFavorites() {
      this.collectionData.favorites = !this.collectionData.favorites;
      try {
        const contentId = this.collectionData.collectionId;
        const response = await addFavorite(contentId);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
