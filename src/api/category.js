import { instance } from "./index";

// 카테고리 수정
function updateCategory(category) {
  return instance.post("category/update", category);
}


export { updateCategory };
