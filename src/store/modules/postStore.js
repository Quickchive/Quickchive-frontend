import { fetchMyContents, fetchMyCollections } from "@/api/user";
import { findData } from "@/utils/search.js";

const postStore = {
  // namespaced: true,
  state: {
    searchWord: "",
    searchResult: [],
  },
  getters: {
    getSearchWord(state) {
      return state.searchWord;
    },
    getSearchResult(state) {
      return state.searchResult;
    },
  },
  mutations: {
    setSearchWord(state, word) {
      state.searchWord = word;
    },
    setSearchResult(state, searchResult) {
      state.searchResult = searchResult;
    },
  },
  actions: {
    // 검색
    async SEARCH({ commit }, word) {
      // 콘텐츠 조회
      word = word.toLowerCase();

      try {
        const contentsResponse = await fetchMyContents();
        const contents = contentsResponse.data.contents;
        // console.log("스토어 검색 - 콘텐츠", contents);
        const collectionsResponse = await fetchMyCollections();
        const collections = collectionsResponse.data.collections;
        // console.log("스토어 검색 - 콜렉션", collections);
        const resultArr = findData(word, contents, collections);
        console.log("스토어 - 검색 결과", resultArr);
        commit("setSearchResult", resultArr);
        commit("setSearchWord", word);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default postStore;
