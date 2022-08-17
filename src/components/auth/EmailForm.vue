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
          <select v-model="emailDomain">
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
        <span v-if="existingEmail" class="error-msg"
          >"이미 사용 중인 이메일 주소입니다."</span
        >
        <!-- 인증번호 -->
        <div v-if="codeInputActive" class="register-form__email">
          <input placeholder="인증번호를 입력해주세요" class="input__code" />
          <TimerComponent></TimerComponent>
          <button :class="['btn--sm', isEmailValid ? 'btnPrimary' : 'btnGray']">
            {{ message.btn }}
          </button>
        </div>
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
    };
  },
  computed: {
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
    // 이메일 전송
    async sendEmail() {
      try {
        const response = await sendEmail(`${this.email}@${this.emailDomain}`);
        console.log("응답", response);
        if (response.data.statusCode == 200) {
          this.codeInputActive = true;
          this.btnMessage.email = "재전송";
        }
      } catch (error) {
        console.log(error);
        // 이미 사용중인 이메일 주소일 경우
        if (error.response.data.statusCode == 400) {
          this.existingEmail = true;
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
