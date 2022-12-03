// 비밀번호 검사
// 최소 8 자, 하나 이상의 문자와 하나의 숫자로 구성
function validatePw(pw) {
  const re = /^(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(pw.toLowerCase()));
}

// 링크 정규식
// http, https

function validateLink(link) {
  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  return re.test(String(link));
}

// 링크 개수 확인
function linkCounter(text) {
  let url = 'http';
  let pos = text.indexOf(url);
  let count = 0;
  while (pos !== -1) {
    count++;
    pos = text.indexOf(url, pos + 1);
  }
  return count;
}

// 링크 추출
function filterLink(text) {
  let linkList = text.split(' ');
  return linkList;
}

// 기한 계산
function countDday(deadline) {
  const expiryDay = new Date(deadline);
  const today = new Date();
  if (expiryDay.toLocaleDateString() === today.toLocaleDateString()) {
    return 'D-Day';
  }
  const diff = today.getTime() - expiryDay.getTime();
  const days = parseInt(Math.abs(diff / (1000 * 60 * 60 * 24)) + 1);
  if (diff > 0) {
    return `D+${days - 1}`;
  }
  return `D-${days}`;
}

export { validatePw, validateLink, linkCounter, countDday, filterLink };
