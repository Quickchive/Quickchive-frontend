import { instance, authInstance } from "./index";

// 회원가입
function registerUser(userData) {
  return instance.post("auth/register", userData);
}

// 로그인
function loginUser(userData) {
  return instance.post("auth/login", userData);
}

// 로그아웃
function logoutUser() {
  return authInstance.get("auth/logout");
}

// 회원탈퇴
function deleteUser() {
  return instance.delete("auth/delete");
}

// 토큰 재발행
function reissueToken(refreshToken) {
  return instance.post("auth/reissue", refreshToken);
}

// 비밀번호 재설정을 위한 메일 전송
function resetPw(email) {
  return instance.get(`auth/send-password-reset-email/${email}`);
}

// 이메일 인증
function verifyEmail(code) {
  return instance.get(`auth/verify-email?code=${code}`);
}

// 새 유저 인증을 위한 메일 전송
function sendEmail(email) {
  return instance.get(`auth/send-verify-email/${email}`);
}


export { registerUser, loginUser, logoutUser, deleteUser, reissueToken, resetPw, verifyEmail, sendEmail };
