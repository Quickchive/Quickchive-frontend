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
  </div>
</template>

<script>
export default {};
</script>

<style></style>
