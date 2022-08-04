import { instance } from "./index";

// 아티클 추가
function addContents(contents) {
  return instance.post("contents/add", contents);
}

// 아티클 정보 수정
function updateContents(contents) {
  return instance.post("contents/update", contents);
}

// 아티클 정보 삭제
function deleteContents(contentId) {
  return instance.delete(`contents/delete/${contentId}`);
}

export { addContents, updateContents, deleteContents };
