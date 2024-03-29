import { getMyContents } from '@/api/contents';
import { search } from '@/utils/search.js';
import { getMyFavorites } from '@/api/contents';
import { sortDataByRecentlySaved } from '@/utils/sort';
import { getCategory } from '@/api/category';

const postStore = {
  state: {
    searchWord: '',
    searchResult: [],
    contents: [],
    favoriteContents: [],
    categories: {},
  },
  getters: {
    getSearchWord(state) {
      return state.searchWord;
    },
    getSearchResult(state) {
      return state.searchResult;
    },
    getContents(state) {
      return state.contents;
    },
    getFavoriteContents(state) {
      return state.favoriteContents;
    },
    getCategories(state) {
      return state.categories;
    },
  },
  mutations: {
    setSearchWord(state, word) {
      state.searchWord = word;
    },
    setSearchResult(state, searchResult) {
      state.searchResult = searchResult;
    },
    setContents(state, contents) {
      state.contents = contents;
    },
    setFavoriteContents(state, favoriteContents) {
      state.favoriteContents = favoriteContents;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    // 검색
    async SEARCH({ commit }, word) {
      word = word.toLowerCase();
      try {
        const response = await getMyContents();
        const contents = response.data.contents;
        const resultArr = search(word, contents);
        commit('setSearchResult', resultArr);
        commit('setSearchWord', word);
      } catch (error) {
        console.log(error);
      }
    },
    async GET_CONTENTS({ commit }, categoryId) {
      try {
        const response = await getMyContents(categoryId);
        const contents = response.data.contents;
        const orderedContents = sortDataByRecentlySaved(contents);
        commit('setContents', orderedContents);
      } catch (error) {
        console.log(error);
      }
    },
    // 즐겨찾기 데이터 조회
    async GET_FAVORITES({ commit }) {
      try {
        const response = await getMyFavorites();
        const favoriteContents = response.data.favorite_contents;
        const orderedFavoriteContents = sortDataByRecentlySaved(
          favoriteContents
        );
        commit('setFavoriteContents', orderedFavoriteContents);
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 조회
    async GET_CATEGORIES({ commit }) {
      try {
        const response = await getCategory();
        const categories = response.data.categoriesTree;
        commit('setCategories', categories);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default postStore;
