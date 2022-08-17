<!-- 회원가입 step 2: 나머지 회원정보 입력 -->

<template>
  <div>
    <div class="flex-container-col">
      <div class="register-wrapper">
        <form @submit.prevent="submitForm">
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

          <!-- 2.1 비밀번호 인풋 -->
          <div class="register-form__wrapper">
            <label for="pw" class="register-form__label">비밀번호</label>
            <input
              type="password"
              v-model="pw"
              id="pw"
              placeholder="8자 이상 문자, 숫자, 기호 사용 가능"
            />
          </div>
          <!-- 2.2 비밀번호 유효성 검사 -->
          <span v-if="validatePw == false" class="error-msg"
            >8자 이상 문자와 숫자를 포함하여 입력해주세요.</span
          >

          <!-- 3.1 비밀번호 확인 인풋 -->
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
          <!-- 3.2 유효성 검사 인풋 -->
          <span v-if="checkPw == false" class="error-msg"
            >비밀번호가 다릅니다.</span
          >

          <!-- 4.1 약관동의 체크박스 -->
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
            회원가입 완료
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
import { verifyEmail, registerUser } from "@/api/auth";

export default {
  components: { ModalComponent },
  data() {
    return {
      nickname: "",
      pw: "",
      pwCheck: "",
      agree: false,
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
  // created() {
  //   this.verifyEmail();
  // },
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
      if (
        this.validateNickname == true &&
        this.validatePw == true &&
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
    // 이메일 인증
    async verifyEmail() {
      try {
        const code = this.$route.query.code;
        const response = await verifyEmail(code);
        console.log(response);
      } catch (error) {
        console.log(error);
        alert(
          "인증되지 않은 이메일 입니다. <br/> 이메일 인증을 다시 시도해주세요."
        );
        this.$router.push("/register/email");
      }
    },
    async submitForm() {
      try {
        const userData = {
          email: "aurora2337@naver.com",
          name: this.nickname,
          password: this.pw,
        };
        const response = await registerUser(userData);
        console.log(response);
        alert("회원가입에 성공하였습니다.");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        alert("회원가입에 실패햐였습니다.");
      }
    },
  },
};
</script>

<style></style>
