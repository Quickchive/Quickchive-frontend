/**** 콘텐츠 + 콜렉션 배열 합쳐서 */

// 1. 최신순 정렬(createdAt)
// - 콘텐츠 및 콜렉션을 우리 웹사이트에 가장 최근에 저장한 순서대로 노출
function sortDataByRecentlySaved(contentsData, collectionData) {
  const newArr = [...contentsData, ...collectionData];
  const sortedArr = newArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sortedArr;
}

// 2. 즐겨찾기 순
// - 즐겨찾기를 지정한 날짜순
// *즐겨찾기가 지정된 콘텐츠 및 콜렉션은 수정된 날짜 순서대로 노출
// (예: 22.8.23 23:34 저장 + 22.9.10에 즐겨찾기 지정 > 22.9.6 14:00 저장 + 22.9.6 14:03에 즐겨찾기 지정)
function sortDataByFavorite(contentsData, collectionData) {
  const newArr = [...contentsData, ...collectionData];
  const favoritesArr = newArr.filter((data) => data.favorite == true);
  const NonFavoritesArr = newArr.filter((data) => data.favorite == false);
  const sortedFavorites = sortLatest(favoritesArr);
  const sortedNonFavorites = sortLatest(NonFavoritesArr);
  const sortedArr = [...sortedFavorites, ...sortedNonFavorites];
  return sortedArr;
}

// 3. 읽을 기한 순
function sortDataByImminentDeadline(contentsData, collectionData) {
  const contentsWithDeadline = getContentsWithDeadline(contentsData);
  const contentsSortedByImminentDeadline = contentsWithDeadline.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );
  const contentsWithOutDeadline = getContentsWithOutDeadline(contentsData);
  const allDataWithoutDeadline = [
    ...contentsWithOutDeadline,
    ...collectionData,
  ];
  const allDataSortedByRecentlySaved = sortLatest(allDataWithoutDeadline);
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

/**** 콘텐츠 / 콜렉션 별개로 */

// 1. 최신순 정렬(createdAt) - 배열 한 개 대상
function sortLatest(data) {
  const sortedArr = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sortedArr;
}

// 2. 즐겨찾기 순 - 즐겨찾기를 지정한 날짜 순
function sortFavorites(data) {
  const arr = data.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const sortedArr = arr.filter((content) => content.favorites == true);
  return sortedArr;
}

// 3. 읽을 기한 순(읽을 기한 짧은 순?)
function sortDeadline(data) {
  const arr = data.filter((content) => content.deadline);
  const sortedArr = arr.sort(
    (a, b) => new Date(b.deadline) - new Date(a.deadline)
  );
  return sortedArr;
}

export {
  sortDataByRecentlySaved,
  sortDataByFavorite,
  sortDataByImminentDeadline,
  sortLatest,
  sortFavorites,
  sortDeadline,
  getContentsWithDeadline,
  getContentsWithOutDeadline,
};
