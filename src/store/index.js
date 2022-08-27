import Vue from "vue";
import Vuex from "vuex";
import { getAuthFromCookie, saveAuthToCookie } from "@/utils/cookies";
import { loginUser } from "@/api/auth";
import { fetchProfile } from "@/api/user";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: "",
    accessToken: getAuthFromCookie(),
    refreshToken: localStorage.getItem("refreshToken"),
    oauthInfo: localStorage.getItem("oauthInfo"),
  },
  getters: {
    isLogin(state) {
      // 토큰 여부로 수정하기
      return state.nickname !== "";
    },
    // 소셜 로그인 여부
    isOauthLogin(state) {
      return state.oauthInfo !== "";
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
    logoutUser(state) {
      state.nickname = "";
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      commit("setRefreshToken", data.refresh_token);
      saveAuthToCookie(data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      const response = await fetchProfile();
      commit("setNickname", response.data.name);
      return data;
    },
  },
});
