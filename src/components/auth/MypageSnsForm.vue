<!-- 마이 페이지 -->

<template>
  <div>
    <div class="flex-container-col">
      <div class="register-wrapper">
        <form @submit.prevent="submitForm">
          <!-- 0. 간편 로그인 -->
          <div class="register-form__wrapper">
            <label for="sns" class="register-form__label">간편로그인</label>
            <span id="sns" class="mypage__email">{{
              this.$store.state.oauthInfo
            }}</span>
          </div>

          <!-- 1.1 닉네임 인풋 -->
          <div class="register-form__wrapper">
            <label for="nickname" class="register-form__label">닉네임</label>
            <input
              type="text"
              v-model="nickname"
              maxlength="8"
              id="nickname"
              placeholder="2 ~ 8자"
              @input="nickname = $event.target.value"
            />
          </div>
          <!-- 1.2 닉네임 유효성 검사 -->
          <span v-if="validateNickname == false" class="error-msg"
            >2자 ~ 8자로 입력해주세요.</span
          >

          <div class="space-33"></div>

          <!-- 제출 버튼 -->
          <button
            class="btn__register"
            :class="{ btnValid: isValid }"
            :disabled="!isValid"
            type="submit"
          >
            수정 완료
          </button>
        </form>
        <button @click="isModalActive = true" class="btn__deleteuser">
          회원탈퇴
        </button>
      </div>
    </div>
    <confirm-modal-component
      v-if="isModalActive == true"
      @rightBtn="isModalActive = false"
      @leftBtn="deleteMembership()"
      :modalContent="modalContent"
      :leftBtnMessage="leftBtnMessage"
      :rightBtnMessage="rightBtnMessage"
    ></confirm-modal-component>
  </div>
</template>

<script>
import { editProfile, fetchProfile } from "@/api/user";
import { deleteUser } from "@/api/auth";
import ConfirmModalComponent from "@/components/modal/ConfirmModalComponent.vue";

export default {
  components: { ConfirmModalComponent },
  data() {
    return {
      nickname: "",
      isModalActive: false,
      modalContent:
        "회원탈퇴 시, 저장한 콘텐츠 및 콜렉션을 불러올 수 없습니다. 회원을 탈퇴하시겠습니까?",
      leftBtnMessage: "네",
      rightBtnMessage: "아니오",
    };
  },
  created() {
    // 프로필 조회
    this.getProfile();
  },
  computed: {
    // 닉네임 유효성 검사: 2~8자
    validateNickname() {
      if (this.nickname == "") {
        return null;
      } else {
        if (this.nickname.length < 2 || this.nickname.length > 8) {
          return false;
        } else {
          return true;
        }
      }
    },
    // 버튼 활성화
    isValid() {
      if (this.validateNickname == true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    initForm() {
      this.nickname = "";
      this.email = "";
      this.pw = "";
      this.oldPw = "";
      this.pwCheck = "";
    },
    // 프로필 조회
    async getProfile() {
      try {
        const response = await fetchProfile();
        this.email = response.data.email;
        this.nickname = response.data.name;
      } catch (error) {
        console.log(error);
      }
    },
    async submitForm() {
      try {
        const userData = {
          name: this.nickname,
          password: this.pw,
          oldPassword: this.oldPw,
        };
        const response = await editProfile(userData);
        console.log(response);
        alert("회원정보 수정에 성공하였습니다.");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        alert("회원정보 수정에 실패하였습니다.");
      }
    },
    // 회원 탈퇴
    async deleteMembership() {
      try {
        this.isModalActive = false;
        const response = await deleteUser();
        console.log(response);
        this.$router.push("/main");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
