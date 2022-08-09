import { instance, authInstance } from "./index";

// 프로필 수정 
function editProfile(userData) {
  return instance.post("users/edit", userData);
}

// 비밀번호 재설정 
function resetPw(password) {
  return instance.post("users/reset-password", password);
}

// 프로필 조회 
function fetchProfile() {
  return authInstance.get("users/me");
}

// 자신의 아티클 조회 
function fetchMyArticle(categoryId) {
  return instance.get(`users/load-contents?categoryId=${categoryId}`);
}

// 자신의 카테고리 목록 조회
function fetchMyCategory() {
  return instance.get("users/load-categories");
}



export { editProfile, resetPw, fetchProfile, fetchMyArticle, fetchMyCategory };