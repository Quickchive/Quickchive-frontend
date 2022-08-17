<!-- 회원가입 step 2: 나머지 회원정보 입력 -->

<template>
  <div>
    <div class="flex-container-col">
      <div class="register-wrapper">
        <form @submit.prevent="submitForm">
          <!-- 닉네임 -->
          <div class="register-form__wrapper">
            <label for="nickname" class="register-form__label">닉네임</label>
            <input
              type="text"
              v-model="nickname"
              maxlength="8"
              id="nickname"
              placeholder="2 ~ 8자"
              @input="this.nickname = $event.target.value"
            />
          </div>
          <!-- 유효성 검사 -->
          <span v-if="!validateNickname" class="error-msg"
            >2자 ~ 8자로 입력해주세요.</span
          >

          <!-- 비밀번호 -->
          <div class="register-form__wrapper">
            <label for="pw" class="register-form__label">비밀번호</label>
            <input
              type="password"
              v-model="pw"
              id="pw"
              placeholder="8자 이상 문자, 숫자, 기호 사용 가능"
            />
          </div>
          <!-- 유효성 검사 -->
          <span v-if="!validatePw" class="error-msg">{{ error.message }}</span>

          <!-- 비밀번호 확인 -->
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
          <!-- 유효성 검사 -->
          <span v-if="!checkPw" class="error-msg">비밀번호가 다릅니다.</span>

          <!-- 약관동의 체크박스 -->
          <div class="register-form__agree">
            <input
              type="checkbox"
              v-model="agree"
              id="checkbox"
              class="login-form__checkbox"
            />
            <label for="checkbox" class="register-form__checkbox-label"></label>
            <p class="register-form__checkbox-agree">
              <button class="btn__tos" @click="showTos()" type="button">
                이용약관
              </button>
              &nbsp;및&nbsp;
              <button class="btn__tos" @click="showPolicy()" type="button">
                개인정보 처리방침
              </button>
              에 동의합니다.
            </p>
          </div>
          <!-- 제출 버튼 -->
          <button
            class="btn__register"
            :class="{ btnValid: isValid }"
            :disabled="!isValid"
            type="submit"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
    <!-- 이용 약관 모달 -->
    <modal-component
      v-if="isTosModalActive"
      @close-modal="isTosModalActive = false"
      :modalTitle="tosModalTitle"
    ></modal-component>
    <!-- 개인정보 처리방침 모달 -->
    <modal-component
      v-if="isPolicyModalActive"
      @close-modal="isPolicyModalActive = false"
      :modalTitle="policyModalTitle"
    ></modal-component>
  </div>
</template>

<script>
import { validatePw } from "@/utils/validation";
import ModalComponent from "@/components/modal/ModalComponent.vue";
export default {
  components: { ModalComponent },
  data() {
    return {
      nickname: "",
      email: "",
      emailDomain: "",
      pw: "",
      pwCheck: "",
      agree: false,
      codeInputActive: false,
      existingEmail: false,
      btnMessage: {
        email: "인증",
      },
      error: {
        message: "8자 이상의 영어, 숫자를 사용해주세요",
      },
      message: {
        btn: "인증",
      },
      // 모달
      isPolicyModalActive: false,
      isTosModalActive: false,
      tosModalTitle: "이용 약관",
      policyModalTitle: "개인정보 처리 방침",
    };
  },
  computed: {
    // 닉네임 유효성 검사
    validateNickname() {
      if (this.nickname == "") {
        return true;
      } else {
        if (this.nickname.length < 2) {
          return false;
        } else if (this.nickname.length > 8) {
          return false;
        } else {
          return true;
        }
      }
    },
    // 비밀번호 유효성 검사
    validatePw() {
      if (this.pw != "") {
        return validatePw(this.pw);
      } else {
        return true;
      }
    },
    // 비밀번호 일치 확인
    checkPw() {
      if (this.pw == "") {
        return true;
      } else {
        if (this.pw != this.pwCheck) {
          return false;
        } else {
          return true;
        }
      }
    },
    // 메일 전송 버튼 활성화 조건
    isEmailValid() {
      if (this.email && this.emailDomain != "") {
        return true;
      } else {
        return false;
      }
    },
    // 버튼 활성화
    isValid() {
      if (
        this.email &&
        this.nickname &&
        this.checkPw == true &&
        this.agree == true
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    initForm() {
      this.nickName = "";
      this.email = "";
      this.pw = "";
    },
    // 이용약관 모달 창
    showTos() {
      this.isTosModalActive = true;
    },
    // 개인정보 이용 방침 모달 창
    showPolicy() {
      this.isPolicyModalActive = true;
    },
  },
};
</script>

<style></style>
