import { authInstance } from "./index";

// 콘텐츠 추가(단일)
function addContents(contentsData) {
  return authInstance.post("contents/add", contentsData);
}

// 콘텐츠 추가(다수)
function addMultipleContents(contentsData) {
  return authInstance.post("contents/addMultiple", contentsData);
}

// 콘텐츠 정보 수정
function updateContents(contents) {
  return authInstance.post("contents/update", contents);
}

// 콘텐츠 정보 삭제
function deleteContents(contentId) {
  return authInstance.delete(`contents/delete/${contentId}`);
}

// 즐겨찾기 등록 및 해제
function addFavorite(contentId) {
  return authInstance.patch(`contents/favorite/${contentId}`);
}

// 읽었음 표시
function postReadFlag(contentId) {
  return authInstance.patch(`contents/read/${contentId}`);
}

export {
  addContents,
  updateContents,
  deleteContents,
  addMultipleContents,
  addFavorite,
  postReadFlag,
};
