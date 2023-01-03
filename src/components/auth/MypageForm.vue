<!-- 마이 페이지 -->

<template>
  <div>
    <div class="flex-container-col">
      <div class="register-wrapper">
        <form @submit.prevent="submitForm">
          <!-- 0. 이메일 -->
          <div class="register-form__wrapper">
            <label for="email" class="register-form__label">이메일</label>
            <span id="email" class="mypage__email">{{
              this.$store.state.authStore.email
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

          <!-- 2.1 기존 비밀번호 -->
          <div class="register-form__wrapper">
            <label for="oldPw" class="register-form__label"
              >기존 비밀번호</label
            >
            <input
              type="password"
              v-model="oldPw"
              id="oldPw"
              placeholder="8자 이상 문자, 숫자, 기호 사용 가능"
            />
          </div>
          <!-- 2.2 비밀번호 유효성 검사 -->
          <span v-if="validateOldPw == false" class="error-msg"
            >8자 이상 문자와 숫자를 포함하여 입력해주세요.</span
          >

          <!-- 3.1 비밀번호 인풋 -->
          <div class="register-form__wrapper">
            <label for="pw" class="register-form__label">새 비밀번호</label>
            <input
              type="password"
              v-model="pw"
              id="pw"
              placeholder="8자 이상 문자, 숫자, 기호 사용 가능"
            />
          </div>
          <!-- 3.2 비밀번호 유효성 검사 -->
          <span v-if="validatePw == false" class="error-msg"
            >8자 이상 문자와 숫자를 포함하여 입력해주세요.</span
          >

          <!-- 4.1 비밀번호 확인 인풋 -->
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
          <!-- 4.2 유효성 검사 인풋 -->
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
    <!-- 에러 모달 -->
    <AlertModalComponent
      v-if="isAlertModalActive == true"
      :alertModalContent="alertModalContent"
      :btnMessage="btnMessage"
      @confirmBtn="isAlertModalActive = false"
    ></AlertModalComponent>
  </div>
</template>

<script>
import { validatePw } from '@/utils/validation';
import { editProfile } from '@/api/user';
import { deleteUser } from '@/api/auth';
import ConfirmModalComponent from '@/components/modal/ConfirmModalComponent.vue';
import AlertModalComponent from '@/components/modal/AlertModalComponent.vue';

export default {
  components: { ConfirmModalComponent, AlertModalComponent },
  data() {
    return {
      nickname: this.$store.state.authStore.nickname,
      oldPw: '',
      pw: '',
      pwCheck: '',
      isModalActive: false,
      confirmModalContent:
        '회원탈퇴 시, 저장한 콘텐츠 및 콜렉션을 불러올 수 없습니다. 회원을 탈퇴하시겠습니까?',
      leftBtnMessage: '네',
      rightBtnMessage: '아니오',
      isAlertModalActive: false,
      AlertModalContent: '',
      btnMessage: '네',
    };
  },
  created() {
    // 프로필 조회
    this.$store.dispatch('GET_PROFILE');
    this.nickname = this.$store.state.authStore.nickname;
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
    // 기존 비밀번호 유효성 검사
    validateOldPw() {
      if (this.oldPw != '') {
        return validatePw(this.oldPw);
      } else {
        return null;
      }
    },
    // 비밀번호 유효성 검사
    validatePw() {
      if (this.pw != '') {
        return validatePw(this.pw);
      } else {
        return null;
      }
    },
    // 비밀번호 일치 확인
    checkPw() {
      if (this.pwCheck == '') {
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
        this.validateOldPw == true &&
        this.validatePw == true &&
        this.checkPw == true
      ) {
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
    // 회원정보 수정
    async submitForm() {
      try {
        const userData = {
          name: this.nickname,
          password: this.pw,
          oldPassword: this.oldPw,
        };
        await editProfile(userData);
        this.$router.push('/main');
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
