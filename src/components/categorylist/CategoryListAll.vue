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
    <div
      class="contents-lists"
      v-if="
        contentState && (contentsData.length > 0 || collectionsData.length > 0)
      "
    >
      <div>
        <div
          v-for="(content, index) in contentsData"
          :key="index"
          class="contents-list"
        >
          <div class="contents-list__wrapper" @click="toLink(content.link)">
            <button class="btn--transparent--img" @click="toLink(content.link)">
              <span class="contents-list__icon"><img :src="web"/></span>
              <span class="contents-list__title">
                {{ filterTitle(content.title) }}
              </span>
            </button>
          </div>
          <div class="contents-list__wrapper">
            <img :src="line" />
            <span v-if="content.deadline" class="contents-list__expiry"
              >D-{{ countDday(content.deadline) }}</span
            >
            <button class="btn--transparent" @click="openMemoModal(index)">
              <img :src="memo" />
            </button>
            <button class="btn--transparent" @click="createFavorites(index)">
              <img v-if="content.favorite" :src="star" />
              <img v-if="!content.favorite" :src="star_gray" />
            </button>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="(collection, index) in collectionsData"
          :key="index"
          class="contents-list"
        >
          <div class="contents-list__wrapper">
            <button
              class="btn--transparent--img"
              @click="toDetail(collection.id)"
            >
              <span class="contents-list__icon"><img :src="web"/></span>
              <span class="contents-list__title">
                {{ filterTitle(collection.title) }}
              </span>
            </button>
          </div>
          <div class="contents-list__wrapper">
            <img :src="line" />
            <button
              class="btn--transparent"
              @click="createFavoriteCollection(index)"
            >
              <img v-if="collection.favorite" :src="star" />
              <img v-if="!collection.favorite" :src="star_gray" />
            </button>
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
import memo from "@/assets/icon/memo.svg";
import star from "@/assets/icon/star.svg";
import star_gray from "@/assets/icon/star_gray.svg";
import web from "@/assets/icon/web.svg";
import { addFavoriteCollection } from "@/api/collection";

import MemoModalComponent from "@/components/modal/MemoModalComponent.vue";
import { countDday } from "@/utils/validation";
import { addFavorite } from "@/api/contents";
import { eventBus } from "@/main.js";

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
      data: 1,
      isFavoriteListUpdated: 0,
      contentsData: [],
      collectionsData: [],
    };
  },
  props: {
    categoryTitle: String,
    categoryId: Number,
  },
  async created() {
    // await this.$store.dispatch("GET_CONTENTS");
    // await this.$store.dispatch("GET_COLLECTIONS");

    eventBus.$on("fetchFavoritesList", (data) => {
      this.isFavoriteListUpdated += data;
      console.log(
        "CategoryList에 이벤트 버스 도착",
        this.isFavoriteListUpdated
      );
    });
  },
  watch: {
    isFavoriteListUpdated() {
      this.$store.dispatch("GET_CONTENTS");
      this.$store.dispatch("GET_COLLECTIONS");
    },
  },
  methods: {
    async showContent() {
      await this.$store.dispatch("GET_CONTENTS");
      await this.$store.dispatch("GET_COLLECTIONS");
      this.contentsData = this.$store.getters.getContents;
      this.collectionsData = this.$store.getters.getCollections;
      this.contentState = !this.contentState;
    },
    // 즐겨찾기 생성
    async createFavorites(index) {
      this.$store.getters.getContents[index].favorite = !this.$store.getters
        .getContents[index].favorite;
      try {
        const contentId = this.$store.getters.getContents[index].id;
        const response = await addFavorite(contentId);
        console.log(response);
        eventBus.$emit("fetchFavoritesList", this.data);
      } catch (error) {
        console.log(error);
      }
    },
    // 즐겨찾기 생성
    async createFavoriteCollection(index) {
      this.$store.getters.getCollections[index].favorite = !this.$store.getters
        .getCollections[index].favorite;
      try {
        const collectionId = this.$store.getters.getCollections[index].id;
        const response = await addFavoriteCollection(collectionId);
        console.log(response);
        eventBus.$emit("fetchFavoritesList", this.data);
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 상세 페이지로 이동
    toCategoryPage() {
      this.$router.push("/category/all");
    },
    // 메모 모달 열기
    openMemoModal(index) {
      this.isMemoModalActive = true;
      this.memoContents = this.$store.getters.getContents[index].comment;
    },
    // 제목 글자수 30자 이상
    filterTitle(title) {
      if (title.length >= 30) {
        return title.substr(0, 30) + "...";
      } else {
        return title;
      }
    },
    // 콜렉션 상세 페이지로 이동
    toDetail(id) {
      this.$router.push(`/collection/${id}`);
    },
    countDday(deadline) {
      return countDday(deadline);
    },
    toLink(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style></style>
