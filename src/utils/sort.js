/**** 콘텐츠 + 콜렉션 배열 합쳐서 */

// 1. 최신순 정렬(createdAt)
// - 콘텐츠 및 콜렉션을 우리 웹사이트에 가장 최근에 저장한 순서대로 노출
function sortLatestArr(contentsData, collectionData) {
  // 1) 콘텐츠 배열과 콜렉션 배열을 합친다.(spread operator: 전개연산자)
  const newArr = [...contentsData, ...collectionData];
  // 2) 문자열 - 날짜를 날짜 - 날짜로 변경
  const sortedArr = newArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sortedArr;
}

// 2. 즐겨찾기 순
// - 즐겨찾기를 지정한 날짜순
// *즐겨찾기가 지정된 콘텐츠 및 콜렉션은 수정된 날짜 순서대로 노출
// (예: 22.8.23 23:34 저장 + 22.9.10에 즐겨찾기 지정 > 22.9.6 14:00 저장 + 22.9.6 14:03에 즐겨찾기 지정)
function sortFavoritesArr(contentsData, collectionData) {
  const newArr = [...contentsData, ...collectionData];

  // 즐겨찾기 있는 것만 분류
  const favoritesArr = newArr.filter((data) => data.favorite == true);
  // 즐겨찾기 없는 것만 분류
  const NonFavoritesArr = newArr.filter((data) => data.favorite == false);

  // 즐겨찾기 된 것들을 최신순으로 정렬
  const sortedFavorites = favoritesArr.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  // 즐겨찾기 되지 않은 것들을 최신순으로 정렬
  const sortedNonFavorites = NonFavoritesArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // 위 두 배열을 합침
  const sortedArr = [...sortedFavorites, ...sortedNonFavorites];

  return sortedArr;
}

// 3. 읽을 기한 순(
function sortDeadlineArr(contentsData, collectionData) {
  // const newArr = [...contentsData, ...collectionData];

  // 기한이 있는 것만 분류
  const deadlineContentArr = contentsData.filter((data) => data.deadline);
  // 기한이 없는 것만 분류
  const nonDeadlineContentArr = contentsData.filter((data) => !data.deadline);

  const nonDeadLineAllArr = [...nonDeadlineContentArr, ...collectionData];

  // 기한이 있는 것들을 읽을 기한이 임박한 순으로 정렬
  const sortedDeadline = deadlineContentArr.sort(
    (a, b) => new Date(a.deadline) - new Date(b.deadline)
  );
  // 기한이 없는 것들을 최신순으로 정렬
  const sortedNonDeadline = nonDeadLineAllArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // 위 두 배열을 합침
  const sortedArr = [...sortedDeadline, ...sortedNonDeadline];

  return sortedArr;
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
  sortLatestArr,
  sortFavoritesArr,
  sortDeadlineArr,
  sortLatest,
  sortFavorites,
  sortDeadline,
};
