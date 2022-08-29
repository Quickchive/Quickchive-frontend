<!-- 비밀번호 재설정 -->

<template>
  <div>
    <div class="flex-container-col">
      <div class="register-wrapper">
        <form @submit.prevent="submitForm">
          <!-- 1.1 비밀번호 인풋 -->
          <div class="register-form__wrapper">
            <label for="pw" class="register-form__label">새 비밀번호</label>
            <input
              type="password"
              v-model="pw"
              id="pw"
              placeholder="8자 이상 문자, 숫자, 기호 사용 가능"
            />
          </div>
          <!-- 1.2 비밀번호 유효성 검사 -->
          <span v-if="validatePw == false" class="error-msg"
            >8자 이상 문자와 숫자를 포함하여 입력해주세요.</span
          >

          <!-- 2.1 비밀번호 확인 인풋 -->
          <div class="register-form__wrapper">
            <label for="pwCheck" class="register-form__label"
              >비밀번호 확인</label
            >
            <input
              type="password"
              v-model="pwCheck"
              id="pwCheck"
              placeholder="비밀번호 재입력"
            />
          </div>
          <!-- 2.2 유효성 검사 인풋 -->
          <span v-if="checkPw == false" class="error-msg"
            >비밀번호가 다릅니다.</span
          >
          <div class="space-33"></div>

          <!-- 제출 버튼 -->
          <button
            class="btn__register"
            :class="{ btnValid: isValid }"
            :disabled="!isValid"
            type="submit"
          >
            비밀번호 재설정
          </button>
        </form>
      </div>
    </div>
    <!-- 경고 모달 -->
    <alert-modal-component
      v-if="isAlertModalActive"
      @confirmBtn="isAlertModalActive = false"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
    ></alert-modal-component>
  </div>
</template>

<script>
import { validatePw } from "@/utils/validation";
import AlertModalComponent from "../modal/AlertModalComponent.vue";

import { resetPw } from "@/api/user";

export default {
  components: { AlertModalComponent },
  data() {
    return {
      pw: "",
      pwCheck: "",
      // alert 모달 메시지
      alertModalContent: "",
      btnMessage: "확인",
      isAlertModalActive: false,
    };
  },
  computed: {
    // 비밀번호 유효성 검사
    validatePw() {
      if (this.pw != "") {
        return validatePw(this.pw);
      } else {
        return null;
      }
    },
    // 비밀번호 일치 확인
    checkPw() {
      if (this.pwCheck == "") {
        return null;
      } else {
        if (this.pw != this.pwCheck) {
          return false;
        } else {
          return true;
        }
      }
    },
    // 버튼 활성화
    isValid() {
      if (this.validatePw == true && this.checkPw == true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    // 비밀번호 재설정
    async submitForm() {
      try {
        const code = this.$route.query.code;
        const pwData = {
          password: this.pw,
          code: code,
        };
        const response = await resetPw(pwData);
        console.log(response);
        this.alertModalContent = "비밀번호 재설정에 성공하였습니다.";
        this.isAlertModalActive = true;
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
  },
};
</script>

<style></style>
