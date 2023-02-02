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

// 자신의 콘텐츠 조회
function getMyContents(categoryId) {
  return authInstance.get(`users/load-contents?categoryId=${categoryId}`);
}

// 자신의 즐겨찾기 조회
function getMyFavorites() {
  return authInstance.get('users/load-favorites');
}

export { editProfile, resetPw, getProfile, getMyContents, getMyFavorites };
