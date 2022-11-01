import { fetchMyContents, fetchMyCollections } from "@/api/user";
import { findData } from "@/utils/search.js";
import { fetchMyFavorites } from "@/api/user";
import { sortLatestArr } from "@/utils/sort";
import { fetchMyCategory } from "@/api/user";

const postStore = {
  state: {
    searchWord: "",
    searchResult: [],
    // 콘텐츠
    contentsData: [],
    // 콜렉션
    collectionsData: [],
    // 최신순으로 정렬된 콘텐츠와 콜렉션
    latestSortedData: [],
    // // 최신순으로 정렬된 콘텐츠와 콜렉션
    latestSortedFavorite: [],
    // 즐겨찾기 콘텐츠
    favoriteContents: [],
    // 즐겨찾기 콜렉션
    favoriteCollections: [],
    // 카테고리
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
    getCollections(state) {
      return state.collectionsData;
    },
    getFavoriteContents(state) {
      return state.favoriteContents;
    },
    getFavoriteCollections(state) {
      return state.favoriteCollections;
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
    setCollections(state, collections) {
      state.collectionsData = collections;
    },
    setFavoriteContents(state, favoriteContents) {
      state.favoriteContents = favoriteContents;
    },
    setFavoriteCollections(state, favoriteCollections) {
      state.favoriteCollections = favoriteCollections;
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
      // 콘텐츠 조회
      word = word.toLowerCase();
      try {
        const contentsResponse = await fetchMyContents();
        const contents = contentsResponse.data.contents;
        const collectionsResponse = await fetchMyCollections();
        const collections = collectionsResponse.data.collections;
        const resultArr = findData(word, contents, collections);
        commit("setSearchResult", resultArr);
        commit("setSearchWord", word);
      } catch (error) {
        console.log(error);
      }
    },
    // 콘텐츠 데이터 조회
    async GET_CONTENTS({ commit }, categoryId) {
      try {
        const response = await fetchMyContents(categoryId);
        const contents = response.data.contents;
        commit("setContents", contents);
      } catch (error) {
        console.log(error);
      }
    },
    // 콜렉션 데이터 조회
    async GET_COLLECTIONS({ commit }, categoryId) {
      try {
        const response = await fetchMyCollections(categoryId);
        const collections = response.data.collections;
        commit("setCollections", collections);
      } catch (error) {
        console.log(error);
      }
    },
    // 최신순으로 정렬된 콘텐츠 & 콜렉션 목록을 반환
    async SORT_DATA({ commit }, categoryId) {
      try {
        const contentsResponse = await fetchMyCollections(categoryId);
        const collections = contentsResponse.data.collections;
        const collectionsResponse = await fetchMyContents(categoryId);
        const contents = collectionsResponse.data.contents;
        const newArr = sortLatestArr(contents, collections);
        commit("setLatestOrder", newArr);
      } catch (error) {
        console.log(error);
      }
    },
    // 즐겨찾기 데이터 조회
    async GET_FAVORITES({ commit }) {
      try {
        const response = await fetchMyFavorites();
        const favoriteContents = response.data.favorite_contents;
        const favoriteCollections = response.data.favorite_collections;
        commit("setFavoriteContents", favoriteContents);
        commit("setFavoriteCollections", favoriteCollections);
        const newArr = sortLatestArr(favoriteContents, favoriteCollections);
        commit("setLatestFavorite", newArr);
      } catch (error) {
        console.log(error);
      }
    },
    // 카테고리 조회
    async GET_CATEGORIES({ commit }) {
      try {
        const response = await fetchMyCategory();
        const categories = response.data.categories;
        commit("setCategories", categories);
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default postStore;
