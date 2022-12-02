<template>
  <div class="flex-container-col">
    <h1 class="page-header">로그인</h1>

    <div class="login-wrapper">
      <form class="login-form">
        <div>
          <label id="email" class="login-form__label">이메일</label>

          <input
            type="text"
            v-model="email"
            id="email"
            @keyup.enter="submitForm()"
          />
        </div>

        <div>
          <label id="pw" class="login-form__label">비밀번호</label>

          <input
            type="password"
            v-model="pw"
            id="pw"
            @keyup.enter="submitForm()"
          />
        </div>
      </form>

      <button
        :disabled="!email || !pw"
        type="button"
        @click="submitForm()"
        class="btn__login"
      >
        로그인
      </button>
    </div>

    <div class="register-form__agree">
      <input
        type="checkbox"
        v-model="stayLogin"
        id="checkbox"
        class="login-form__checkbox"
      />

      <label for="checkbox" class="register-form__checkbox-label"></label>

      <p class="login-form__checkbox-label">로그인 상태 유지</p>
    </div>

    <div>
      <!-- <router-link to="/register/email" class="login-form__link-register">
        회원가입 하기
      </router-link> -->
      <button @click="toRegister()" class="login-form__link-register">
        회원가입 하기
      </button>
      &nbsp;&nbsp;
      <router-link to="/resetpw/email" class="login-form__link-register">
        비밀번호 재설정
      </router-link>
    </div>

    <span class="login-form__or">OR</span>

    <div class="oauth-btn__wrapper">
      <button @click="setStayLogin()" class="btn--transparent">
        <a href="https://test.hou27.shop/api/oauth/kakao-auth" target="_blank">
          <img :src="kakaoBtn" />
        </a>
      </button>

      <button @click="setStayLogin()" class="btn--transparent">
        <a href="https://test.hou27.shop/api/oauth/google-auth" target="_blank">
          <img :src="googleBtn" />
        </a>
      </button>
    </div>

    <alert-modal-component
      v-if="isAlertModalActive"
      @confirmBtn="isAlertModalActive = false"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
    ></alert-modal-component>

    <notice-modal-component
      v-if="isNoticeModalActive"
      :confirmModalContent="confirmModalContent"
      @close-modal="isNoticeModalActive = false"
      :isCloseBtnShow="true"
      :noticeTitle="noticeTitle"
    ></notice-modal-component>
  </div>
</template>

<script>
import kakaoBtn from '@/assets/img/kakaoBtn.png';
import googleBtn from '@/assets/img/googleBtn.svg';
import AlertModalComponent from '../modal/AlertModalComponent.vue';
import NoticeModalComponent from '../modal/NoticeModalComponent.vue';

export default {
  components: { AlertModalComponent, NoticeModalComponent },
  data() {
    return {
      email: '',
      NoticeModalComponent: '',
      pw: '',
      kakaoBtn,
      googleBtn,
      // alert 모달 메시지
      alertModalContent: '',
      btnMessage: '확인',
      isAlertModalActive: false,
      stayLogin: false,
      // notice 모달 메시지
      isNoticeModalActive: false,
      noticeTitle: '회원가입 일시 중단 안내',
      confirmModalContent:
        '개인정보 처리방침 개편을 위해\n회원 가입을 일시 중단하오니\n이용에 참고 부탁드립니다.',
    };
  },

  methods: {
    // 로그인 요청
    async submitForm() {
      try {
        const userData = {
          email: this.email,
          password: this.pw,
          auto_login: this.stayLogin,
        };
        await this.$store.dispatch('LOGIN', userData);
        // 로그인 유지 여부 저장
        this.$store.dispatch('STAY_LOGIN', this.stayLogin);
        await this.$router.push('/main').catch(() => {});
      } catch (error) {
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    setStayLogin() {
      this.$store.dispatch('STAY_LOGIN', this.stayLogin);
    },
    toRegister() {
      this.isNoticeModalActive = true;
    },
  },
};
</script>

<style></style>
