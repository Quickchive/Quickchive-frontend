<template>
  <div class="collection-component" v-if="collectionData">
    <div class="collection__wrapper-col">
      <span class="collection-tag">Collection</span>
      <p
        class="collection__title"
        v-if="collectionData.title"
        @click="toDetail()"
      >
        {{ filterTitle(collectionData.title) }}
      </p>
      <div class="collection__lists-wrapper">
        <div v-if="collectionData.contents">
          <ul class="collection__lists">
            <li
              v-for="(list, index) in collectionData.contents"
              :key="index"
              class="collection__list"
            >
              <span v-if="list.title">{{ filterTitle(list.title) }}</span>
            </li>
          </ul>
        </div>

        <div v-if="collectionData.contents">
          <div
            v-for="(list, index) in collectionData.contents"
            :key="index"
            class="collection__list-num"
          >
            <span v-if="index == 4">&nbsp;외 {{ list.length - index }}개</span>
          </div>
        </div>
      </div>
      <div class="collection__inner" v-if="collectionData.createdAt">
        <p class="collection__createdAt">
          {{ collectionData.createdAt.substring(0, 10) }}
        </p>
        <div class="collection__btn-wrapper">
          <button @click="openMemoModal()" class="btn--transparent">
            <img :src="memo" />
          </button>
          <img :src="category_line" />
          <button @click="createFavorites()" class="btn--transparent">
            <img :src="star" v-show="collectionData.favorite" /><img
              :src="star_border"
              v-show="!collectionData.favorite"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="collection__wrapper">
      <!-- 이미지 -->
      <div class="collection__img" v-if="collectionData.contents">
        <img
          :src="collectionData.contents[0].coverImg"
          onerror="this.style.display='none'"
        />
        <div v-if="collectionData.contents" class="collection__num">
          +{{ collectionData.contents.length }}
        </div>
      </div>
      <button class="btn--transparent" @click="openEditModal()">
        <img :src="edit" />
      </button>
    </div>
    <!-- 메모 모달 컴포넌트 -->
    <memo-modal-component
      v-if="isMemoModalActive"
      @close-modal="isMemoModalActive = false"
      :memoContents="memoContents"
    ></memo-modal-component>
    <!-- 콜렉션 수정 모달 -->
    <collection-edit-modal-component
      v-if="isCollectionModalActive"
      @close-modal="isCollectionModalActive = false"
      :collectionData="collectionData"
    ></collection-edit-modal-component>
    <!-- 에러 모달 -->
    <alert-modal-component
      v-if="isAlertModalActive == true"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
      @confirmBtn="isAlertModalActive = false"
    ></alert-modal-component>
  </div>
</template>

<script>
import memo from "@/assets/icon/memo.svg";
import star from "@/assets/icon/star.svg";
import star_border from "@/assets/icon/star_border.svg";
import edit from "@/assets/icon/edit.svg";
import category_line from "@/assets/icon/category_line.svg";
import MemoModalComponent from "@/components/modal/MemoModalComponent.vue";
import { addFavoriteCollection } from "@/api/collection";
import CollectionEditModalComponent from "@/components/modal/CollectionEditModalComponent.vue";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";

export default {
  components: {
    MemoModalComponent,
    CollectionEditModalComponent,
    AlertModalComponent,
  },
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
      // 콜렉션 모달
      isCollectionModalActive: false,
      collectionModalTitle: "콜렉션 수정",
      // 경고 모달 메시지
      alertModalContent: "",
      btnMessage: "네",
      isAlertModalActive: false,
    };
  },
  props: {
    collectionData: {
      type: Object,
    },
  },
  methods: {
    openMemoModal() {
      this.isMemoModalActive = true;
      this.memoContents = this.collectionData.comment;
    },
    // 즐겨찾기 생성
    async createFavorites() {
      this.collectionData.favorite = !this.collectionData.favorite;
      try {
        const contentId = this.collectionData.id;
        const response = await addFavoriteCollection(contentId);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    openEditModal() {
      this.isCollectionModalActive = true;
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
    toDetail() {
      this.$router.push(`/collection/${this.collectionData.id}`);
    },
  },
};
</script>

<style></style>
