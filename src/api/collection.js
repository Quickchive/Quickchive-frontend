import { authInstance } from './index';

// 콜렉션 추가
function addCollection(collectionData) {
  return authInstance.post('collections/add', collectionData);
}

// 콜렉션 수정
function updateCollection(collectionData) {
  return authInstance.post('collections/update', collectionData);
}

// 콜렉션 삭제
function deleteCollection(collectionId) {
  return authInstance.delete(`collections/delete/${collectionId}`);
}

// 콜렉션 즐겨찾기 추가
function addFavoriteCollection(collectionId) {
  return authInstance.patch(`collections/favorite/${collectionId}`);
}

export {
  addCollection,
  updateCollection,
  deleteCollection,
  addFavoriteCollection,
};
