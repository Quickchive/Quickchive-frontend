<template>
  <div class="collection-view">
    <!-- 콜렉션 정보 설명 -->
    <div v-if="!collectionData">
      <h2>(임시)콜렉션 정보가 존재하지 않습니다.</h2>
    </div>
    <div v-if="collectionData">
      <header class="collection__header">
        <div class="flex-container">
          <span class="collection__header-name">Collection</span>
          <!-- 즐겨찾기 -->
          <button class="btn--transparent" @click="createFavorites()">
            <img v-if="collectionData.favorite" :src="star" />
            <img v-if="!collectionData.favorite" :src="star_gray" />
          </button>
        </div>
        <div class="collection__header-wrapper" v-if="collectionData">
          <div class="flex-container">
            <!-- 제목 -->
            <p class="collection__header-title" v-if="collectionData.title">
              {{ filterTitle(collectionData.title) }}
            </p>
            <!-- 개수 -->
            <span class="collection__header-num" v-if="collectionData.contents"
              >총 {{ collectionData.contents.length }}개</span
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
      <div v-if="collectionData.contents">
        <div
          class="flex-container--col"
          v-for="(content, index) in collectionData.contents"
          :key="index"
        >
          <div class="collection-contents__wrapper">
            <!-- 번호 -->
            <div class="collection-contents__index">
              {{ index + 1 }}
            </div>
            <!-- 내용 (수정 꼭)-->
            <div
              class="collection-contents__text-wrapper"
              v-if="collectionData"
            >
              <p
                @click="toLink(content.link)"
                class="collection-contents__title"
                v-if="content.title"
              >
                {{ filterTitle(content.title) }}
              </p>
              <p
                class="collection-contents__description"
                v-if="content.descrpition"
              >
                {{ filterDescript(content.description) }}
              </p>
              <span class="collection-contents__domain" v-if="content.link">
                {{ filterDomain(content.link) }}
              </span>
            </div>
            <!-- 이미지 -->
            <div
              class="collection-contents__img"
              v-if="collectionData.contents"
            >
              <img
                :src="content.coverImg"
                onerror="this.style.display='none'"
              />
            </div>
          </div>
          <hr width="90%" color="#F4F6F8" size="1" />
        </div>
      </div>
    </div>

    <!-- 콜렉션 모달 -->
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
import { fetchMyCollections } from "@/api/user";
import star from "@/assets/icon/star.svg";
import star_gray from "@/assets/icon/star_gray.svg";
import { addFavoriteCollection } from "@/api/collection";
import edit from "@/assets/icon/edit.svg";
import CollectionEditModalComponent from "@/components/modal/CollectionEditModalComponent.vue";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";

export default {
  components: { CollectionEditModalComponent, AlertModalComponent },
  data() {
    return {
      star,
      star_gray,
      edit,
      collectionData: {},
      // 콜렉션 모달
      isCollectionModalActive: false,
      // 경고 모달 메시지
      alertModalContent: "",
      btnMessage: "네",
      isAlertModalActive: false,
    };
  },
  created() {
    this.fetchCollectionsList();
  },
  watch: {
    collectionData() {
      this.fetchCollectionsList();
    },
  },
  methods: {
    // 콜렉션 리스트 조회
    async fetchCollectionsList() {
      try {
        const response = await fetchMyCollections();
        this.collectionData = response.data.collections;
        this.collectionData = this.collectionData.filter(
          (data) => data.id == this.$route.params.id
        );
        this.collectionData = this.collectionData[0];
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
        const response = await addFavoriteCollection(this.$route.params.id);
        console.log(response);
        // 즐겨찾기 리스트 갱신
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
  },
};
</script>

<style></style>
