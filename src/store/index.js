import Vue from "vue";
import Vuex from "vuex";
import {
  getAuthFromCookie,
  saveAuthToCookie,
} from "@/utils/cookies";
import { loginUser } from "@/api/auth";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      userName: "",
      accessToken: getAuthFromCookie(),
      refreshToken: localStorage.getItem("refreshToken")
  },
  getters: {
    isLogin(state) {
      return state.userName !== "";
    },
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setRefreshToken(state, token) {
      state.refreshToken = token;
    },
    setUserName(state, userName) {
      state.userName = userName;
    },
    logoutUser(state) {
      state.userName = "";
    }
  },
  actions: {
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(`${userData.email}님 로그인 완료`);
      commit("setRefreshToken", data.refresh_token);
      saveAuthToCookie(data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      return data;
    },
  }
});
