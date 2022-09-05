<template>
  <div class="collection-view">
    <!-- 콜렉션 정보 설명 -->
    <header class="collection__header">
      <div class="flex-container">
        <span class="collection__header-name">Collection</span>
        <!-- 즐겨찾기 -->
        <button class="btn--transparent" @click="createFavorites()">
          <img v-if="collectionData.favorite" :src="star" />
          <img v-if="!collectionData.favorite" :src="star_gray" />
        </button>
      </div>
      <div class="collection__header-wrapper">
        <div class="flex-container">
          <!-- 제목 -->
          <p class="collection__header-title">
            {{ filterTitle(collectionData.title) }}
          </p>
          <!-- 개수 -->
          <span class="collection__header-num"
            >총 {{ collectionData.contentLinkList.length }}개</span
          >
        </div>
        <!-- 콜렉션 수정 버튼 -->
        <button
          class="btn--transparent btn__editContents"
          @click="openEditModal()"
        >
          <img :src="edit" />
        </button>
      </div>
      <!-- 설명 -->
      <p class="collection__header-description">
        {{ collectionData.comment }}
      </p>
    </header>
    <!-- 콜렉션 내 콘텐츠 -->
    <div class="flex-container--col">
      <div
        v-for="(content, index) in collectionData.contentLinkList"
        :key="index"
        class="collection-contents__wrapper"
      >
        <!-- 번호 -->
        <div class="collection-contents__index">
          {{ index + 1 }}
        </div>
        <!-- 내용 (수정 꼭)-->
        <div class="collection-contents__text-wrapper">
          <p @click="toLink(content)" class="collection-contents__title">
            {{ filterTitle(content) }}
          </p>
          <p class="collection-contents__description">
            {{ filterDescript(content) }}
          </p>
          <span class="collection-contents__domain">
            {{ filterDomain(content) }}
          </span>
        </div>
        <!-- 이미지 -->
        <div class="collection-contents__img"></div>
      </div>
      <hr width="90%" color="#F4F6F8" size="1" />
    </div>
    <!-- 콜렉션 모달 -->
    <collection-modal-component
      v-if="isCollectionModalActive"
      @close-modal="isCollectionModalActive = false"
      :collectionModalTitle="collectionModalTitle"
      @collectionEvent="editCollection()"
      :collectionData="collectionData"
    ></collection-modal-component>
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
import { fetchMyCollections } from "@/api/user";
import star from "@/assets/icon/star.svg";
import star_gray from "@/assets/icon/star_gray.svg";
import { addFavorite } from "@/api/contents";
import edit from "@/assets/icon/edit.svg";
import CollectionModalComponent from "@/components/modal/CollectionModalComponent.vue";
import { updateCollection } from "@/api/collection";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";

export default {
  components: { CollectionModalComponent, AlertModalComponent },
  data() {
    return {
      star,
      star_gray,
      edit,
      // 콜렉션 데이터 -> 수정 해야됨
      collectionData: {
        collectionId: 1,
        favorite: false,
        title: "비즈니스 모델 분석법",
        comment:
          "비즈니스 모델 수립 및 분석은 PM의 핵심역량이다. 주니어 PM이 서비스를 개선하거나, 새로운 기능을 추가할 때 이 콜렉션을 본다면 많은 도움이 될 것이다. 공백포함 100자이내 ",
        categoryName: "비즈니스",
        contentLinkList: [
          "https://www.youtube.com/watch?v=SHn_z7qLaTQ",
          "https://www.youtube.com/watch?v=G0pZOiNUJYs",
        ],
      },
      // 콜렉션 모달
      isCollectionModalActive: false,
      collectionModalTitle: "콜렉션 수정",
      // 경고 모달 메시지
      alertModalContent: "",
      btnMessage: "네",
      isAlertModalActive: false,
    };
  },
  methods: {
    // 콜렉션 리스트 조회
    async fetchCollectionsList() {
      try {
        const response = await fetchMyCollections();
        console.log("콜렉션 리스트 조회", response.collections);
        this.collectionData = response.collections;
      } catch (error) {
        console.log(error);
      }
    },
    // 제목 글자수 30자 이상
    filterTitle(title) {
      if (title.length >= 30) {
        return title.substr(0, 30) + "...";
      } else {
        return title;
      }
    },
    // 도메인 추출
    filterDomain(link) {
      // let link = this.favoritesList[index].link;
      let domain;
      if (link.includes("www") == true) {
        let domain1 = link.split(".");
        domain1 = domain1[1];
        domain = domain1;
      } else {
        // domain = domain[1];
        let pos1 = link.indexOf("//");
        let pos2 = link.substring(pos1 + 2);
        domain = pos2.split(".");
        domain = domain[0];
        // console.log(domain[1]);
      }
      return domain;
    },
    // 즐겨찾기 생성
    async createFavorites() {
      this.collectionData.favorite = !this.collectionData.favorite;
      try {
        const collectionId = this.collectionData.collectionId;
        const response = await addFavorite(collectionId);
        console.log(response);
        // 즐겨찾기 리스트 갱신
        this.fetchFavoritesList();
      } catch (error) {
        console.log(error);
      }
    },
    // 설명 글자수 30자 이상
    filterDescript(description) {
      if (description.length >= 90) {
        return description.substr(0, 90) + "...";
      } else {
        return description;
      }
    },
    toLink(link) {
      window.open(link, "_blank");
    },
    openEditModal() {
      this.isCollectionModalActive = true;
    },
    // 콜렉션 수정
    async editCollection(collectionData) {
      try {
        const response = await updateCollection(collectionData);
        console.log(response);
        this.$emit("close-modal");
        console.log(" 최종 보낼 값", collectionData);
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.message;
        this.isAlertModalActive = true;
      }
    },
  },
};
</script>

<style></style>
