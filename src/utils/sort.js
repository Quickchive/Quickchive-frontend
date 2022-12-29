// 1. 최신순 정렬(createdAt)
// - 콘텐츠 및 콜렉션을 우리 웹사이트에 가장 최근에 저장한 순서대로 노출
function sortDataByRecentlySaved(contentsData) {
  const sortedArr = contentsData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sortedArr;
}

// 2. 즐겨찾기 순
// - 즐겨찾기를 지정한 날짜순
// *즐겨찾기가 지정된 콘텐츠 및 콜렉션은 수정된 날짜 순서대로 노출
// (예: 22.8.23 23:34 저장 + 22.9.10에 즐겨찾기 지정 > 22.9.6 14:00 저장 + 22.9.6 14:03에 즐겨찾기 지정)
function sortDataByFavorite(contentsData) {
  const favoritesArr = contentsData.filter((data) => data.favorite == true);
  const NonFavoritesArr = contentsData.filter((data) => data.favorite == false);
  const sortedFavorites = sortDataByRecentlySaved(favoritesArr);
  const sortedNonFavorites = sortDataByRecentlySaved(NonFavoritesArr);
  const sortedArr = [...sortedFavorites, ...sortedNonFavorites];
  return sortedArr;
}

// 3. 읽을 기한 순
function sortDataByImminentDeadline(contentsData) {
  const contentsWithDeadline = getContentsWithDeadline(contentsData);
  const contentsSortedByImminentDeadline = contentsWithDeadline.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );
  const contentsWithOutDeadline = getContentsWithOutDeadline(contentsData);
  const allDataSortedByRecentlySaved = sortDataByRecentlySaved(
    contentsWithOutDeadline
  );
  const dataSortedByImminentDeadline = [
    ...contentsSortedByImminentDeadline,
    ...allDataSortedByRecentlySaved,
  ];
  return dataSortedByImminentDeadline;
}

function getContentsWithDeadline(contentsData) {
  const contentsWithDeadline = contentsData.filter((data) => data.deadline);
  return contentsWithDeadline;
}

function getContentsWithOutDeadline(contentsData) {
  const contentsWithOutDeadline = contentsData.filter((data) => !data.deadline);
  return contentsWithOutDeadline;
}

export {
  sortDataByRecentlySaved,
  sortDataByFavorite,
  sortDataByImminentDeadline,
  getContentsWithDeadline,
  getContentsWithOutDeadline,
};
