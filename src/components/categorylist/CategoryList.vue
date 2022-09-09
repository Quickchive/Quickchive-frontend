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
    <div
      class="contents-lists"
      v-if="
        contentState && (contentsList.length > 0 || collectionList.length > 0)
      "
    >
      <div>
        <div
          v-for="(content, index) in contentsList"
          :key="index"
          class="contents-list"
        >
          <div class="contents-list__wrapper" @click="toLink(content.link)">
            <button class="btn--transparent--img" @click="toLink(content.link)">
              <span class="contents-list__icon"><img :src="web" /></span>
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
          v-for="(collection, index) in collectionList"
          :key="index"
          class="contents-list"
        >
          <div class="contents-list__wrapper">
            <button
              class="btn--transparent--img"
              @click="toDetail(collection.id)"
            >
              <span class="contents-list__icon"><img :src="web" /></span>
              <span class="contents-list__title">
                {{ filterTitle(collection.title) }}
              </span>
            </button>
          </div>
          <div class="contents-list__wrapper">
            <img :src="line" />
            <button class="btn--transparent" @click="openMemoModal(index)">
              <img :src="memo" />
            </button>
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
import { fetchMyContents } from "@/api/user";
import { fetchMyCollections } from "@/api/user";
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
      contentsList: [],
      collectionList: [],
      data: 1,
      isFavoriteListUpdated: 0,
    };
  },
  props: {
    categoryTitle: String,
    categoryId: Number,
  },
  created() {
    this.fetchContentsList();
    this.fetchCollectionsList();
    eventBus.$on("fetchFavoritesList", (data) => {
      this.isFavoriteListUpdated += data;
      console.log(
        "CategoryList에 이벤트 버스 도착",
        this.isFavoriteListUpdated
      );
    });
  },
  watch: {
    isFavoriteListUpdated: function () {
      this.fetchContentsList();
      this.fetchCollectionsList();
    },
  },
  methods: {
    showContent() {
      this.contentState = !this.contentState;
    },
    // 즐겨찾기 생성
    async createFavorites(index) {
      console.log("인덱스", index);
      this.contentsList[index].favorite = !this.contentsList[index].favorite;
      try {
        const contentId = this.contentsList[index].id;
        const response = await addFavorite(contentId);
        console.log(response);
        eventBus.$emit("fetchFavoritesList", this.data);
      } catch (error) {
        console.log(error);
      }
    },
    // 즐겨찾기 생성
    async createFavoriteCollection(index) {
      this.collectionList[index].favorite =
        !this.collectionList[index].favorite;
      try {
        const collectionId = this.conllectionList[index].id;

        const response = await addFavoriteCollection(collectionId);
        console.log(response);
        eventBus.$emit("fetchFavoritesList", this.data);
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 상세 페이지로 이동
    toCategoryPage() {
      this.$router.push(`/category/${this.categoryId}`);
    },
    // 나의 콘텐츠 조회 (카테고리 아이디 받아서 조회하기)
    async fetchContentsList() {
      try {
        const response = await fetchMyContents(this.categoryId);
        // 콘텐츠 컴포넌트에 데이터 전달
        this.contentsList = response.data.contents;
        console.log("콘텐츠 데이터", this.contentsList);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchCollectionsList() {
      try {
        // const collectionId = this.$route.path.id;
        const response = await fetchMyCollections(this.categoryId);
        this.collectionList = response.data.collections;
      } catch (error) {
        console.log(error);
      }
    },
    // 메모 모달 열기
    openMemoModal(index) {
      this.isMemoModalActive = true;
      this.memoContents = this.contentsList[index].comment;
    },
    // 제목 글자수 30자 이상
    filterTitle(title) {
      if (title.length >= 30) {
        return title.substr(0, 30) + "...";
      } else {
        return title;
      }
    },
    countDday(deadline) {
      console.log(countDday(deadline));
      return countDday(deadline);
    },
    toLink(link) {
      window.open(link, "_blank");
    },
    // 콜렉션 상세 페이지로 이동
    toDetail(id) {
      this.$router.push(`/collection/${id}`);
    },
    // 제목 글자수 10자 이상
    filterCategoryTitle(title) {
      if (title.length >= 10) {
        return title.substr(0, 10) + "...";
      } else {
        return title;
      }
    },
  },
};
</script>

<style></style>
