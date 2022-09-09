// 검색

function findData(word, contents, collection) {
  // 검색 대상 데이터의 제목에서 word와 일치하는게 있으면 해당 배열을 반환한다.
  const targetData = [...contents, ...collection];

  // 1. 제목에 검색어가 있는 배열만 반환
  const findFromTitle = targetData.filter((data) =>
    // 검색 기준: 제목, 콘텐츠, 메모
    data.title.includes(word)
  );

  // // 2.1 메모 중 검색어가 있는 배열만 반환
  const containMemo = targetData.filter((data) => data.comment);
  console.log("2-1", containMemo);

  // 2.2 콘텐츠 || 콜렉션 메모가 존재하는 배열만 반환 (data.comment)
  const findFromMemo = containMemo.filter((data) =>
    data.comment.includes(word)
  );
  console.log("2-2", findFromMemo);

  // 3-1. 콜렉션 - 콘텐츠 목록에 검색어가 있는 배열만 반환
  const containContents = collection.filter((data) => data.contents.length > 0);
  console.log("3-1 콜렉션 - 콘텐츠가 존재하는 배열", containContents);

  let i = 0;
  const findFromContents = [];
  for (i = 0; i < containContents.length; i++) {
    const result = containContents[i].contents.filter((data) =>
      data.title.includes(word)
    );
    if (result.length > 0) {
      findFromContents.push(containContents[i]);
    }
  }

  const resultData = [...findFromTitle, ...findFromContents, ...findFromMemo];

  const set = new Set(resultData);
  const uniqueArr = [...set];

  console.log(uniqueArr);
  return uniqueArr;
}

export { findData };
