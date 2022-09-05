/**** 콘텐츠 + 콜렉션 배열 합쳐서 */

// 1. 최신순 정렬(createdAt) - 배열 두 개 합친 후에
function sortLatestArr(contentsData, collectionData) {
  // 1) 콘텐츠 배열과 콜렉션 배열을 합친다.(spread operator: 전개연산자)
  const newArr = [...contentsData, ...collectionData];
  // 2) 문자열 - 날짜를 날짜 - 날짜로 변경
  const sortedArr = newArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return sortedArr;
}

// 2. 즐겨찾기 순 - 즐겨찾기를 지정한 날짜 순
function sortFavoritesArr(contentsData, collectionData) {
  const newArr = [...contentsData, ...collectionData];
  const arr = newArr.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const sortedArr = arr.filter((data) => data.favorites == true);
  return sortedArr;
}

// 3. 읽을 기한 순(읽을 기한 짧은 순?)
function sortDeadlineArr(contentsData, collectionData) {
  const newArr = [...contentsData, ...collectionData];

  const arr = newArr.filter((data) => data.deadline);

  const sortedArr = arr.sort(
    (a, b) => new Date(b.deadline) - new Date(a.deadline)
  );
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
