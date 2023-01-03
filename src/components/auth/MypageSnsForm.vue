<!-- 마이 페이지 -->

<template>
  <div>
    <div class="flex-container-col">
      <div class="register-wrapper">
        <form @submit.prevent="submitForm">
          <!-- 0. 간편 로그인 -->
          <div class="register-form__wrapper">
            <label for="sns" class="register-form__label">간편로그인</label>
            <span id="sns" class="mypage__email">{{ oauthName }}</span>
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
      :confirmModalContent="confirmModalContent"
      :leftBtnMessage="leftBtnMessage"
      :rightBtnMessage="rightBtnMessage"
    ></confirm-modal-component>
    <AlertModalComponent
      v-if="isAlertModalActive == true"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
      @confirmBtn="isAlertModalActive = false"
    ></AlertModalComponent>
  </div>
</template>

<script>
import { editProfile } from '@/api/user';
import { deleteUser } from '@/api/auth';
import ConfirmModalComponent from '@/components/modal/ConfirmModalComponent.vue';
import AlertModalComponent from '@/components/modal/AlertModalComponent.vue';

export default {
  components: { ConfirmModalComponent, AlertModalComponent },
  data() {
    return {
      nickname: '',
      isModalActive: false,
      confirmModalContent:
        '회원탈퇴 시, 저장한 콘텐츠 및 콜렉션을 불러올 수 없습니다. 회원을 탈퇴하시겠습니까?',
      leftBtnMessage: '네',
      rightBtnMessage: '아니오',
      isAlertModalActive: false,
      AlertModalContent: '',
      btnMessage: '네',
      oauthName: '',
    };
  },
  async created() {
    // 프로필 조회
    await this.$store.dispatch('GET_PROFILE');
    this.nickname = this.$store.getters.getNickname;
    this.oauthName = localStorage.getItem('oauthInfo');
  },
  computed: {
    // 닉네임 유효성 검사: 2~8자
    validateNickname() {
      if (this.nickname == '') {
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
      this.nickname = '';
      this.email = '';
      this.pw = '';
      this.oldPw = '';
      this.pwCheck = '';
    },
    async submitForm() {
      try {
        const userData = {
          name: this.nickname,
          password: this.pw,
          oldPassword: this.oldPw,
        };
        await editProfile(userData);
        this.$router.push('/login');
      } catch (error) {
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 회원 탈퇴
    async deleteMembership() {
      try {
        this.isModalActive = false;
        await deleteUser();
        this.$store.commit('logoutUser');
        this.$router.push('/');
      } catch (error) {
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
  },
};
</script>

<style></style>
