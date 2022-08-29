<!-- 회원가입 step 1: 이메일 인증 -->
<template>
  <div class="flex-container-col">
    <div class="register-wrapper">
      <form @submit.prevent="submitForm">
        <!-- 이메일 -->
        <div class="register-form__email">
          <div class="register-form__wrapper">
            <label for="email" class="register-form__label">이메일</label>
            <input type="text" v-model="email" id="email" />
          </div>
          <span>@</span>
          <div class="register-form__wrapper" v-if="emailDomain == 'etc'">
            <input type="text" v-model="emailSelfInput" />
          </div>
          <select v-model="emailDomain">
            <option value="">이메일 선택</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="daum.com">daum.net</option>
            <option value="etc">직접입력</option>
          </select>
          <button
            :class="['btn--sm', isEmailValid ? 'btnPrimary' : 'btnGray']"
            type="button"
            @click="sendEmail()"
            :disabled="!isEmailValid"
          >
            {{ btnMessage.email }}
          </button>
        </div>
        <!-- 유효성 검사 -->
        <span v-if="errorEvent" class="error-msg">{{ errorMessage }}</span>
        <!-- 인증메일 전송 안내 & 타이머 -->
        <TimerComponent
          v-if="isTimerActive"
          ref="timerComponent"
        ></TimerComponent>
      </form>
    </div>
  </div>
</template>

<script>
import { sendEmail } from "@/api/auth";
import TimerComponent from "../common/TimerComponent.vue";
export default {
  component: { TimerComponent },
  data() {
    return {
      email: "",
      emailDomain: "",
      emailSelfInput: "",
      codeInputActive: false,
      btnMessage: {
        email: "인증",
      },
      errorMessage: "",
      message: {
        btn: "인증",
      },
      errorEvent: false,
      timerComponent: "",
      isTimerActive: false,
    };
  },
  computed: {
    // 메일 전송 버튼 활성화 조건
    isEmailValid() {
      if (this.email && this.emailDomain != "" && this.emailDomain != "etc") {
        return true;
      } else if (this.emailDomain == "etc" && this.emailSelfInput) {
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
    // 이메일 전송
    async sendEmail() {
      try {
        this.isTimerActive = true;
        this.errorEvent = false;
        if (this.emailDomain != "etc") {
          const response = await sendEmail(`${this.email}@${this.emailDomain}`);
          console.log("응답", response);
          if (response.data.statusCode == 200) {
            this.codeInputActive = true;
            this.btnMessage.email = "재전송";
            this.$refs.timerComponent.resetTimer();
          }
        } else if (this.emailDomain == "etc") {
          const response = await sendEmail(
            `${this.email}@${this.emailSelfInput}`
          );
          console.log("응답", response);
          if (response.data.statusCode == 200) {
            this.codeInputActive = true;
            this.btnMessage.email = "재전송";
            this.$refs.timerComponent.resetTimer();
          }
        }
      } catch (error) {
        console.log(error);
        // 이미 사용중인 이메일 주소일 경우 or 이미 인증된 메일
        if (error.response.data.statusCode == 409) {
          this.errorMessage = error.response.data.message;
          this.isTimerActive = false;
          this.errorEvent = true;
        }
      }
    },
    initForm() {
      this.nickName = "";
      this.email = "";
      this.pw = "";
    },
  },
  components: { TimerComponent },
};
</script>

<style></style>
