import { fetchMyContents } from '@/api/user';
import { search } from '@/utils/search.js';
import { fetchMyFavorites } from '@/api/user';
import { sortDataByRecentlySaved } from '@/utils/sort';
import { fetchMyCategory } from '@/api/user';

const postStore = {
  state: {
    searchWord: '',
    searchResult: [],
    contentsData: [],
    latestSortedData: [],
    latestSortedFavorite: [],
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
      return state.contentsData;
    },
    getFavoriteContents(state) {
      return state.favoriteContents;
    },
    getLatestSortedData(state) {
      return state.latestSortedData;
    },
    getLatestSortedFavorite(state) {
      return state.latestSortedFavorite;
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
      state.contentsData = contents;
    },
    setFavoriteContents(state, favoriteContents) {
      state.favoriteContents = favoriteContents;
    },
    setLatestOrder(state, newArr) {
      state.latestSortedData = newArr;
    },
    setLatestFavorite(state, newArr) {
      state.latestSortedFavorite = newArr;
    },
    // 카테고리
    setCategories(state, categories) {
      state.categories = categories;
    },
  },
  actions: {
    // 검색
    async SEARCH({ commit }, word) {
      word = word.toLowerCase();
      try {
        const response = await fetchMyContents();
        const contents = response.data.contents;
        const resultArr = search(word, contents);
        commit('setSearchResult', resultArr);
        commit('setSearchWord', word);
      } catch (error) {
        console.log(error);
      }
    },
    // 콘텐츠 데이터 조회
    async GET_CONTENTS({ commit }, categoryId) {
      try {
        const response = await fetchMyContents(categoryId);
        const contents = response.data.contents;
        commit('setContents', contents);
      } catch (error) {
        console.log(error);
      }
    },
    // 최신순으로 정렬된 콘텐츠 & 콜렉션 목록을 반환
    async SORT_DATA({ commit }, categoryId) {
      try {
        const contentsResponse = await fetchMyContents(categoryId);
        const contents = contentsResponse.data.contents;
        const newArr = sortDataByRecentlySaved(contents);
        commit('setLatestOrder', newArr);
      } catch (error) {
        console.log(error);
      }
    },
    // 즐겨찾기 데이터 조회
    async GET_FAVORITES({ commit }) {
      try {
        const response = await fetchMyFavorites();
        const favoriteContents = response.data.favorite_contents;
        commit('setFavoriteContents', favoriteContents);
        const newArr = sortDataByRecentlySaved(favoriteContents);
        commit('setLatestFavorite', newArr);
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 조회
    async GET_CATEGORIES({ commit }) {
      try {
        const response = await fetchMyCategory();
        const categories = response.data.categories;
        commit('setCategories', categories);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default postStore;
