function makeTargetData(contents, collection) {
  const targetData = [...contents, ...collection];
  return targetData;
}

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

function findSameContentsFromCollection(word, collection) {
  const containContents = collection.filter((data) => data.contents.length > 0);

  const findFromContents = [];
  for (let i = 0; i < containContents.length; i++) {
    const result = containContents[i].contents.filter((data) =>
      data.title.toLowerCase().includes(word)
    );
    if (result.length > 0) {
      findFromContents.push(containContents[i]);
    }
  }
  return findFromContents;
}

function search(word, contents, collection) {
  const targetData = makeTargetData(contents, collection);
  const findFromTitle = findSameTitleFromTargetData(word, targetData);
  const containMemo = findContentsWithMemo(targetData);
  const findFromMemo = findSameMemoFromTargetData(word, containMemo);
  const findFromContents = findSameContentsFromCollection(word, collection);
  const resultData = [...findFromTitle, ...findFromContents, ...findFromMemo];
  const set = new Set(resultData);
  const uniqueArr = [...set];
  return uniqueArr;
}

export {
  search,
  makeTargetData,
  findSameTitleFromTargetData,
  findContentsWithMemo,
  findSameMemoFromTargetData,
  findSameContentsFromCollection,
};
