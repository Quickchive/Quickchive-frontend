<template>
  <div class="collection-component" v-if="collection">
    <div class="collection__wrapper-col">
      <span class="collection-tag">Collection</span>
      <p class="collection__title" v-if="collection.title" @click="toDetail()">
        {{ filterTitle(collection.title) }}
      </p>
      <div class="collection__lists-wrapper">
        <div v-if="collection.contents">
          <ul class="collection__lists">
            <div v-for="(list, index) in collection.contents" :key="index">
              <li v-if="index < 4" class="collection__list">
                <span>{{ filterTitle(list.title) }}</span>
              </li>
            </div>
          </ul>
        </div>

        <div v-if="collection.contents">
          <div
            v-for="(list, index) in collection.contents"
            :key="index"
            class="collection__list-num"
          >
            <span v-if="index == 4"
              >&nbsp;외 {{ collection.contents.length - index }}개</span
            >
          </div>
        </div>
      </div>
      <div class="collection__inner" v-if="collection.createdAt">
        <p class="collection__createdAt">
          {{ collection.createdAt.substring(0, 10) }}
        </p>
        <div class="collection__btn-wrapper">
          <img :src="category_line" />
          <button @click="createFavorites()" class="btn--transparent">
            <img :src="star" v-show="collection.favorite" /><img
              :src="star_border"
              v-show="!collection.favorite"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="collection__wrapper">
      <!-- 이미지 -->
      <div class="collection__img" v-if="collection.contents">
        <img
          :src="collection.contents[0].coverImg"
          onerror="this.style.display='none'"
        />
        <div v-if="collection.contents" class="collection__num">
          +{{ collection.contents.length }}
        </div>
      </div>
      <button class="btn--transparent" @click="openEditModal()">
        <img :src="edit" />
      </button>
    </div>
    <!-- 콜렉션 수정 모달 -->
    <collection-edit-modal-component
      v-if="isCollectionModalActive"
      @close-modal="isCollectionModalActive = false"
      :collectionId="collectionId"
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
import { addFavoriteCollection } from "@/api/collection";
import CollectionEditModalComponent from "@/components/modal/CollectionEditModalComponent.vue";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";
import { eventBus } from "../../main";

export default {
  components: {
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
      // 콜렉션 모달
      isCollectionModalActive: false,
      // 경고 모달 메시지
      alertModalContent: "",
      btnMessage: "네",
      isAlertModalActive: false,
      collectionId: 0,
    };
  },
  props: {
    collection: {
      type: Object,
    },
  },
  watch: {
    // contents: {
    //   handler() {
    //     this.memoContents = this.contents.comment;
    //   },
    //   deep: true,
    // },
    isCollectionModalActive: {
      handler() {
        eventBus.$emit("collectionModalActive", 1);
        console.log("eventBus-콜렉션");
      },
      deep: true,
    },
  },
  created() {
    this.collectionId = this.collection.id;
    eventBus.$on();
  },
  methods: {
    // 즐겨찾기 생성
    async createFavorites() {
      this.collection.favorite = !this.collection.favorite;
      try {
        const contentId = this.collection.id;
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
      this.$router.push(`/collection/${this.collection.id}`);
    },
  },
};
</script>

<style></style>
