<template>
  <div class="flex-container-col">
    <h1 class="page-header">회원가입</h1>
    <div class="register-wrapper">
      <form @submit.prevent="submitForm">
      <!-- 이메일 -->
      <div class="register-form__email">
        <div class="register-form__wrapper">
          <label for="email" class="register-form__label">이메일</label>
          <input type="text" v-model="email" id="email"/>
        </div>
        <span>@</span>
        <select v-model="emailDomain">
          <option value="gmail.com">gmail.com</option>
          <option value="naver.com">naver.com</option>
          <option value="daum.com">daum.net</option>
          <option value="etc">직접입력</option>
        </select>
        <button class="btn__verify">인증</button>
      </div> 
      <!-- 유효성 검사 -->
      <span v-if="!validateEmail" class="error-msg">{{ error.message }}</span>


      <!-- 인증번호 -->
      <div class="register-form__email">
        <input placeholder="인증번호를 입력해주세요" class="input__code"/>
        <button class="btn__verify">{{ message.btn }}</button>
      </div>

      <!-- 닉네임 -->
      <div class="register-form__wrapper">
        <label for="nickname" class="register-form__label">닉네임</label>
        <input type="text" v-model="nickname" maxlength="8" id="nickname" placeholder="2 ~ 8자" @input="this.nickname = $event.target.value"/>
      </div>
      <!-- 유효성 검사 -->
      <span v-if="!validateNickname" class="error-msg">2자 ~ 8자로 입력해주세요.</span>

      <!-- 비밀번호 -->
      <div class="register-form__wrapper">
        <label for="pw" class="register-form__label">비밀번호</label>
        <input type="password" v-model="pw" id="pw" placeholder="8자 이상 문자, 숫자, 기호 사용 가능"/>
      </div>
      <!-- 유효성 검사 -->
      <span v-if="!validatePw" class="error-msg">{{ error.message }}</span>

      <!-- 비밀번호 확인 -->
      <div class="register-form__wrapper">
        <label for="pwCheck" class="register-form__label">비밀번호 확인</label>
        <input type="password" v-model="pwCheck" id="pwCheck" placeholder="비밀번호 재입력"/>
      </div>
      <!-- 유효성 검사 -->
      <span v-if="!checkPw" class="error-msg">비밀번호가 다릅니다.</span>

      <!-- 약관동의 체크박스 -->
      <div class="register-form__agree">
        <input type="checkbox" v-model="agree" id="checkbox" class="login-form__checkbox"/>
        <label for="checkbox" class="register-form__checkbox-label"></label>
        <p class="register-form__checkbox-agree">
          <button class="btn__tos" @click="showTos()" type="button">이용약관</button>&nbsp;및&nbsp;<button class="btn__tos" @click="showPolicy()" type="button">개인정보 처리방침</button>에 동의합니다.
        </p>
      </div>

      <!-- 제출 버튼 -->
      <button class="btn__register" :class="{ btnValid: isValid }" :disabled="!isValid" type="submit">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script>
import { registerUser } from '@/api/auth';
import { validatePw } from '@/utils/validation';
export default {
  data() {
    return {
      nickname: '',
      email: '',
      emailDomain: '',
      pw: '',
      pwCheck: '',
      agree: false,
      error: {
        message: '8자 이상의 영어, 숫자를 사용해주세요',
      },
      message: {
        btn: '인증'
      }
    }
  },
  computed: {
    // 이메일 유효성 검사
    validateEmail() {
      if (this.email == '') {
        return true;
      } else {
        return false;
      }
    },
    // 닉네임 유효성 검사
    validateNickname() {
      if (this.nickname == '') {
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
      if (this.pw != '') {
				return validatePw(this.pw);
			} else {
				return true;
			}
    },
    // 비밀번호 일치 확인
    checkPw() {
			if (this.pw == '') {
				return true;
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
        this.email &&
        this.nickname &&
        this.checkPw == true &&
        this.agree == true) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async submitForm() {
      try {
        const userData = {
          nickname: this.nickname,
          email: this.email,
          password: this.pw,
        };
        const response = await registerUser(userData);
        if (response.status == 201) {
          alert("인증 이메일이 전송되었습니다.");
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.nickName = '';
      this.email = '';
      this.pw = '';
    },
    // 이용약관 모달 창
    showTos() {
      console.log("이용약관 모달 창 열기");
      let isTosModalActive = true;
      this.$emit('showTosModal', isTosModalActive);
    },
    // 개인정보 이용 방침 모달 창
    showPolicy() {
      console.log("개인정보 이용 방침 모달 창 열기");
      let isPolicyModalActive = true;
      this.$emit('showPolicyModal', isPolicyModalActive);
    }
  },
}
</script>

<style>

</style>