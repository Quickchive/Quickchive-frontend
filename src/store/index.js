import Vue from "vue";
import Vuex from "vuex";
import {
  getAuthFromCookie,
  saveAuthToCookie,
  deleteCookie,
} from "@/utils/cookies";
import { loginUser } from "@/api/auth";
import { fetchProfile } from "@/api/user";
import { logoutUser } from "@/api/auth";
import { googleLogin, kakaoLogin } from "@/api/oauth";
import { findData } from "@/utils/search.js";
import { fetchMyContents, fetchMyCollections } from "@/api/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: "",
    email: "",
    loginState: false || localStorage.getItem("refreshToken"),
    oauthLoginState: false,
    accessToken: "" || getAuthFromCookie("accessToken"),
    refreshToken: "" || localStorage.getItem("refreshToken"),
    oauthInfo: false || localStorage.getItem("oauthInfo"),
    stayLoginState: false || localStorage.getItem("stayLogin"),
    searchWord: "",
    searchResult: [],
  },
  getters: {
    // 로그인 여부 확인
    isLogin(state) {
      return state.loginState;
    },
    // 소셜 로그인 여부 확인
    isOauthLogin(state) {
      return state.oauthLoginState;
    },
    isUserStayLogin(state) {
      return state.stayLoginState;
    },
    getSearchWord(state) {
      return state.searchWord;
    },
    getSearchResult(state) {
      return state.searchResult;
    },
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
    },
    setNickname(state, nickname) {
      state.nickname = nickname;
    },
    setEmail(state, email) {
      state.email = email;
    },
    // 로그아웃 (닉네임, 토큰 삭제)
    logoutUser(state) {
      state.nickname = "";
      state.email = "";
      state.accessToken = "";
      state.refreshToken = "";
      deleteCookie("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("oauthInfo");
      state.loginState = false;
      state.oauthLoginState = false;
    },
    setLoginState(state, loginState) {
      state.loginState = loginState;
    },
    setOauthLoginState(state, oauthLoginState) {
      state.oauthLoginState = oauthLoginState;
    },
    setStayLoginState(state, stayLoginState) {
      state.stayLoginState = stayLoginState;
    },
    setSearchWord(state, word) {
      state.searchWord = word;
    },
    setSearchResult(state, searchResult) {
      state.searchResult = searchResult;
    },
  },
  actions: {
    // 로그인
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      commit("setRefreshToken", data.refresh_token);
      saveAuthToCookie(data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      const response = await fetchProfile();
      commit("setNickname", response.data.name);
      commit("setEmail", response.data.email);
      commit("setLoginState", true);
      commit("setOauthLoginState", false);
      return data;
    },
    // 프로필 조회이자 로그인 여부 확인
    async FETCH_PROFILE({ commit }) {
      try {
        const { data } = await fetchProfile();
        commit("setNickname", data.name);
        commit("setEmail", data.email);
        console.log("vuex에서 로그인 여부 확인중", data);
        if (data.statusCode == 201) {
          commit("setLoginState", true);
        } else if (data.statusCode == 200) {
          commit("setLoginState", true);
        }
      } catch (error) {
        console.log(error);
        if (error.statusCode == 401) {
          commit("setLoginState", false);
        }
      }
    },
    // 로그아웃
    async LOGOUT({ commit }) {
      try {
        const refreshToken = {
          refresh_token: this.state.refreshToken,
        };
        const { response } = await logoutUser(refreshToken);
        console.log("로그아웃", response);
        commit("logoutUser");
      } catch (error) {
        console.log(error);
      }
    },
    // 구글 로그인 요청
    async GOOGLE_LOGIN({ commit }, code) {
      try {
        const response = await googleLogin(code);
        console.log(response);
        if (response.data.statusCode == 200) {
          console.log("구글 로그인 성공");
          localStorage.setItem("refreshToken", response.data.refresh_token);
          saveAuthToCookie(response.data.access_token);
          commit("setNickname", response.data.name);
          commit("setEmail", response.data.email);
          commit("setOauthLoginState", true);
          commit("setLoginState", false);
        }
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 카카오 로그인 요청
    async KAKAO_LOGIN({ commit }, code) {
      try {
        const response = await kakaoLogin(code);
        console.log(response);
        if (response.data.statusCode == 200) {
          console.log("카카오 로그인 성공");
          localStorage.setItem("refreshToken", response.data.refresh_token);
          saveAuthToCookie(response.data.access_token);
          commit("setNickname", response.data.name);
          commit("setEmail", response.data.email);
          commit("setOauthLoginState", true);
          commit("setLoginState", false);
        }
      } catch (error) {
        console.log(error);
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 액세스 토큰 갱신
    RENEW_TOKEN({ commit }, accessToken) {
      commit("setAccessToken", accessToken);
      saveAuthToCookie(accessToken);
      console.log("여긴 vuex, access 토큰값 갱신함");
    },
    // 리프레시 토큰 갱신
    RENEW_REFRESH_TOKEN({ commit }, refreshToken) {
      commit("setRefreshToken", refreshToken);
      localStorage.setItem("refreshToken", refreshToken);
      console.log("여긴 vuex, refrest 토큰값 갱신함");
    },
    // 로그인 유지
    STAY_LOGIN({ commit }, stayLoginState) {
      commit("setStayLoginState", stayLoginState);
      localStorage.setItem("stayLogin", stayLoginState);
      console.log("로그인 유지 값 로컬스토리지에 세팅");
    },

    // 검색
    async SEARCH({ commit }, word) {
      // 콘텐츠 조회
      word = word.toLowerCase();
      console.log("스토어", word);

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
});
