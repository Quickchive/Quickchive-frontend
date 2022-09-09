<!-- 1. 비밀번호 재설정 이메일 -->
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
        <TimerComponent v-if="isTimerActive" ref="timer"></TimerComponent>
      </form>
    </div>
  </div>
</template>

<script>
import { resetPw } from "@/api/auth";
import TimerComponent from "@/components/common/TimerComponent.vue";
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
      timerMessage: "",
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
  },
  methods: {
    // 이메일 전송
    async sendEmail() {
      this.isTimerActive = true;
      try {
        if (this.emailDomain != "etc") {
          const email = `${this.email}@${this.emailDomain}`;
          const response = await resetPw(email);
          console.log(response);
          if (response.data.statusCode == 200) {
            this.codeInputActive = true;
            this.btnMessage.email = "재전송";
            this.$refs.timer.resetTimer();
          }
        } else if (this.emailDomain == "etc") {
          const email = `${this.email}@${this.emailSelfInput}`;
          const response = await resetPw(email);
          console.log(response);
          if (response.data.statusCode == 200) {
            this.isTimerActive = true;
            this.codeInputActive = true;
            this.btnMessage.email = "재전송";
            this.$refs.timer.resetTimer();
          }
        }
      } catch (error) {
        this.isTimerActive = false;
        console.log(error);
        this.errorMessage = error.response.data.message;
        this.errorEvent = true;
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
