<!-- 개별 콘텐츠 컴포넌트 -->
<template>
  <div class="contents-component">
    <div class="contents__wrapper-col">
      <p class="contents__title" @click="toLink(contentsData.link)">
        {{ filterTitle(contentsData.title) }}
      </p>
      <p class="contents__contents">
        {{ filterDescript(contentsData.description) }}
      </p>
      <div class="contents__inner">
        <p class="contents__domain">
          {{ filterDomain(contentsData.link) }} |
          {{ contentsData.createdAt.substring(0, 10) }}
        </p>
        <div class="contents__btn-wrapper">
          <button class="btn--transparent" @click="openMemoModal()">
            <img :src="memo" />
          </button>
          <img :src="category_line" />
          <button @click="createFavorites()" class="btn--transparent">
            <img :src="star" v-show="contentsData.favorite" /><img
              :src="star_border"
              v-show="!contentsData.favorite"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="contents__wrapper">
      <!-- 이미지 -->
      <div class="contents__img">
        <div v-if="contentsData.deadline" class="contents__expiryDate">
          D-{{ countDday }}
        </div>
      </div>
      <button
        class="btn--transparent btn__editContents"
        @click="openEditModal()"
      >
        <img :src="edit" />
      </button>
    </div>
    <!-- 콘텐츠 수정 모달 컴포넌트 -->
    <contents-edit-modal-component
      v-if="isModalActive"
      @close-modal="isModalActive = false"
      @deleteContent="isAlertModalActive = true"
      :contentsData="contentsData"
    ></contents-edit-modal-component>
    <!-- 메모 모달 컴포넌트 -->
    <memo-modal-component
      v-if="isMemoModalActive"
      @close-modal="isMemoModalActive = false"
      :memoContents="memoContents"
    ></memo-modal-component>
    <!-- 경고 모달 컴포넌트 -->
    <AlertModalComponent
      v-if="isAlertModalActive == true"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
      @confirmBtn="deleteContent()"
    ></AlertModalComponent>
  </div>
</template>

<script>
import memo from "@/assets/icon/memo.svg";
import star from "@/assets/icon/star.svg";
import star_border from "@/assets/icon/star_border.svg";
import edit from "@/assets/icon/edit.svg";
import category_line from "@/assets/icon/category_line.svg";
import { countDday } from "@/utils/validation";
import { validateLink, linkCounter } from "@/utils/validation";
import ContentsEditModalComponent from "@/components/modal/ContentsEditModalComponent.vue";
import MemoModalComponent from "@/components/modal/MemoModalComponent.vue";
import { addFavorite, deleteContents } from "@/api/contents";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";

export default {
  components: {
    ContentsEditModalComponent,
    MemoModalComponent,
    AlertModalComponent,
  },
  data() {
    return {
      memo,
      star,
      edit,
      category_line,
      star_border,
      isModalActive: false,
      // 전달할 메모
      isMemoModalActive: false,
      memoContents: "",
      // 경고 모달
      isAlertModalActive: false,
      alertModalContent: "해당 콘텐츠를 삭제할까요?",
      btnMessage: "네",
      // 폼 항목
      link: "",
      title: "",
      deadline: "",
      comment: "",
      categoryName: "미분류",
      // 더미 데이터
      contentsData: {
        id: 1,
        title: "제목",
        link: "https://naver.com",
        comment: "설명",
        categoryName: "카테고리",
        favorite: true,
        description: "설명이고",
        createdAt: "2022-09-09",
      },
    };
  },
  // props: {
  //   contentsData: Object,
  // },
  created() {
    console.log("콘텐츠컴포넌트 데이터", this.contentsData);
    this.memoContents = this.contentsData.comment;
    console.log("메모", this.memoContents);
  },
  computed: {
    countDday() {
      console.log(countDday(this.contentsData.deadline));
      return countDday(this.contentsData.deadline);
    },
    // 링크 여부 확인
    isTextLink() {
      if (this.contentsData.link != "") {
        return validateLink(this.contentsData.link);
      } else {
        return null;
      }
    },
    // 링크 개수 확인
    countLink() {
      if (this.link != "") {
        return linkCounter(this.contentsData.link);
      } else {
        return null;
      }
    },
  },
  methods: {
    toLink(link) {
      window.open(link, "_blank");
    },
    // 콘텐츠 수정 모달 오픈
    openEditModal() {
      this.isModalActive = true;
    },
    // 메모 모달 오픈
    openMemoModal() {
      this.isMemoModalActive = true;
    },
    // 제목 글자수 30자 이상
    filterTitle(title) {
      if (title.length >= 30) {
        return title.substr(0, 30) + "...";
      } else {
        return title;
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
    // 도메인 추출
    filterDomain(link) {
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
    async createFavorites(index) {
      console.log("인덱스", index);
      this.contentsData.favorite = !this.contentsData.favorite;
      try {
        const contentId = this.contentsData.id;
        const response = await addFavorite(contentId);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    // 콘텐츠 삭제
    async deleteContent() {
      try {
        const contentId = this.contentsData.id;
        const response = await deleteContents(contentId);
        console.log(response);
        this.$emit("close-modal");
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
