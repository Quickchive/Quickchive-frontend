import Vue from "vue";
import Vuex from "vuex";
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie
} from "@/utils/cookies";
import { loginUser } from "@/api/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      userEmail: getUserFromCookie() || "",
      accessToken: getAuthFromCookie() || "",
      refreshToken: localStorage.getItem("refreshToken") || ""
  },
  getters: {
    isLogin(state) {
      return state.userEmail !== "";
    },
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
    },
    setUserEmail(state, userEmail) {
      state.userEmail = userEmail;
    },
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(`${userData.email}님 로그인 완료`);
      commit("setAccessToken", data.access_token);
      commit("setRefreshToken", data.refresh_token);
      commit("setUserEmail", userData.email);
      saveUserToCookie(userData.email);
      saveAuthToCookie(data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      return data;
    },
  }
});
