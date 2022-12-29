function findSameTitleFromTargetData(word, targetData) {
  const result = targetData.filter((data) =>
    data.title.toLowerCase().includes(word)
  );
  return result;
}

function findContentsWithMemo(targetData) {
  const result = targetData.filter((data) => data.comment);
  return result;
}

function findSameMemoFromTargetData(word, targetData) {
  const result = targetData.filter((data) =>
    data.comment.toLowerCase().includes(word)
  );
  return result;
}

function search(word, contents) {
  const findFromTitle = findSameTitleFromTargetData(word, contents);
  const containMemo = findContentsWithMemo(contents);
  const findFromMemo = findSameMemoFromTargetData(word, containMemo);
  const resultData = [...findFromTitle, ...findFromMemo];
  const set = new Set(resultData);
  const uniqueArr = [...set];
  return uniqueArr;
}

export {
  search,
  findSameTitleFromTargetData,
  findContentsWithMemo,
  findSameMemoFromTargetData,
};
