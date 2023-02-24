import { instance, authInstance } from './index';

// 프로필 수정
function editProfile(userData) {
  return authInstance.post('users/edit', userData);
}

// 비밀번호 재설정
function resetPw(pwData) {
  return instance.post('users/reset-password', pwData);
}

// 프로필 조회
function getProfile() {
  return authInstance.get('users/me');
}

export { editProfile, resetPw, getProfile };
