<!-- 개별 콘텐츠 컴포넌트 -->
<template>
  <div class="contents-component">
    <div class="contents__wrapper-col">
      <div class="flex-container">
        <!-- [test] 문서 요약 api test -->
        <button @click="getSummary()" class="btn__summarize">
          요약
        </button>
        <p class="contents__title" @click="toLink(contents.link)">
          {{ filterTitle(contents.title) }}
        </p>
        <!-- readflag -->
        <div v-if="!readFlag" class="contents__readflag"></div>
      </div>
      <p class="contents__contents">
        <span v-if="contents.description">{{
          filterDescript(contents.description)
        }}</span>
      </p>

      <div class="contents__inner">
        <!-- 사이트 네임 있는 경우 -->
        <p class="contents__domain" v-if="contents.siteName">
          {{ contents.siteName }} |
          {{ contents.createdAt.substring(0, 10) }}
        </p>
        <!-- 사이트 네임 없는 경우 -->
        <p class="contents__domain" v-if="!contents.siteName && contents.link">
          {{ filterDomain(contents.link) }} |
          {{ contents.createdAt.substring(0, 10) }}
        </p>
        <div class="contents__btn-wrapper">
          <button class="btn--transparent" @click="openMemoModal()">
            <img :src="memo" />
          </button>
          <img :src="category_line" />
          <button @click="createFavorites()" class="btn--transparent">
            <img :src="star" v-show="contents.favorite" /><img
              :src="star_border"
              v-show="!contents.favorite"
            />
          </button>
        </div>
      </div>
    </div>
    <div class="contents__wrapper">
      <!-- 이미지 -->
      <div class="contents__img">
        <img
          :src="contents.coverImg"
          onerror="this.style.display='none'"
          v-if="contents.coverImg.length > 0"
        />
        <img :src="defaultImg" v-else />
        <div v-if="contents.deadline" class="contents__expiryDate">
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
      :contentsId="contentsId"
    ></contents-edit-modal-component>
    <!-- 메모 모달 컴포넌트 -->
    <memo-modal-component
      v-if="isMemoModalActive"
      @close-modal="isMemoModalActive = false"
      :memoContents="memoContents"
      :contentsId="contentsId"
    ></memo-modal-component>
    <!-- 경고 모달 컴포넌트 -->
    <AlertModalComponent
      v-if="isAlertModalActive == true"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
      @confirmBtn="this.isAlertModalActive == false"
    ></AlertModalComponent>
    <!-- 문서 요약 모달 컴포넌트 -->
    <summary-modal-component
      v-if="isSummarizeModalActive"
      @close-modal="isSummarizeModalActive = false"
      :summaryContents="summaryContents"
    ></summary-modal-component>
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
import { addFavorite, postReadFlag, summarizeContents } from "@/api/contents";
import AlertModalComponent from "@/components/modal/AlertModalComponent.vue";
import { eventBus } from "../../main";
import SummaryModalComponent from "@/components/modal/SummaryModalComponent.vue";
import defaultImg from "@/assets/img/categoryDefaultImg.svg";

export default {
  components: {
    ContentsEditModalComponent,
    MemoModalComponent,
    AlertModalComponent,
    SummaryModalComponent,
  },
  data() {
    return {
      memo,
      star,
      edit,
      defaultImg,
      category_line,
      star_border,
      isModalActive: false,
      // 전달할 메모
      isMemoModalActive: false,
      memoContents: "",
      contetnsId: 0,
      // 문서 요약 메모
      isSummarizeModalActive: false,
      summaryContents: "",
      // 경고 모달
      isAlertModalActive: false,
      btnMessage: "네",
      // 폼 항목
      link: "",
      title: "",
      deadline: "",
      comment: "",
      categoryName: "미분류",
      readFlag: null,
    };
  },
  props: {
    contents: {
      comment: String,
    },
  },
  watch: {
    contents: {
      handler() {
        this.memoContents = this.contents.comment;
        this.readFlag = this.contents.readFlag;
      },
      deep: true,
    },
    isModalActive: {
      handler() {
        eventBus.$emit("contentsModalActive", 1);
      },
      deep: true,
    },
  },
  created() {
    this.memoContents = this.contents.comment;
    this.contentsId = this.contents.id;
    this.readFlag = this.contents.readFlag;
  },
  computed: {
    countDday() {
      return countDday(this.contents.deadline);
    },
    // 링크 여부 확인
    isTextLink() {
      if (this.contents.link != "") {
        return validateLink(this.contents.link);
      } else {
        return null;
      }
    },
    // 링크 개수 확인
    countLink() {
      if (this.link != "") {
        return linkCounter(this.contents.link);
      } else {
        return null;
      }
    },
  },
  methods: {
    async toLink(link) {
      // 해당 링크로 이동
      window.open(link, "_blank");
      // 읽었음 표시
      this.readFlag = true;
      if (this.contents.readFlag == false) {
        try {
          await postReadFlag(this.contents.id);
        } catch (error) {
          console.log(error);
        }
      }
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
        let pos1 = link.indexOf("//");
        let pos2 = link.substring(pos1 + 2);
        domain = pos2.split(".");
        domain = domain[0];
      }
      return domain;
    },
    // 즐겨찾기 생성
    async createFavorites() {
      this.contents.favorite = !this.contents.favorite;
      try {
        const contentId = this.contents.id;
        await addFavorite(contentId);
      } catch (error) {
        console.log(error);
      }
    },
    // 문서 요약 api test
    async getSummary() {
      try {
        const response = await summarizeContents(this.contents.id);
        this.summaryContents = response.data.summary;
      } catch (error) {
        this.summaryContents = error.response.data.message;
      } finally {
        this.isSummarizeModalActive = true;
      }
    },
  },
};
</script>

<style></style>
