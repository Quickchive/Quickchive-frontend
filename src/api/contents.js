import { authInstance, instance } from "./index";

// 콘텐츠 추가
function addContents(contentsData) {
  return authInstance.post("contents/add", contentsData);
}

// 콘텐츠 정보 수정
function updateContents(contents) {
  return instance.post("contents/update", contents);
}

// 콘텐츠 정보 삭제
function deleteContents(contentId) {
  return instance.delete(`contents/delete/${contentId}`);
}

export { addContents, updateContents, deleteContents };
