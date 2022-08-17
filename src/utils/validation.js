// 비밀번호 검사
// 최소 8 자, 하나 이상의 문자와 하나의 숫자로 구성

function validatePw(pw) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/;
  return re.test(String(pw.toLowerCase()));
}

export { validatePw };
