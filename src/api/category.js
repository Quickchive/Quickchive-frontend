import { authInstance } from "./index";

// 카테고리 추가
function addCategory(categoryName) {
  return authInstance.post("category/add", categoryName);
}

// 카테고리 수정
function updateCategory(categoryData) {
  return authInstance.post("category/update", categoryData);
}

// 카테고리 삭제
function deleteCategory(categoryId) {
  return authInstance.delete(`category/delete/${categoryId}`);
}

export { addCategory, updateCategory, deleteCategory };
