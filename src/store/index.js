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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nickname: "",
    email: "",
    loginState: false,
    oauthLoginState: false,
    accessToken: "" || getAuthFromCookie("accessToken"),
    refreshToken: "" || localStorage.getItem("refreshToken"),
    oauthInfo: "" || localStorage.getItem("oauthInfo"),
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
    },
    setLoginState(state, loginState) {
      state.loginState = loginState;
    },
    setOauthLoginState(state, oauthLoginState) {
      state.oauthLoginState = oauthLoginState;
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
      return data;
    },
    // 프로필 조회이자 로그인 여부 확인
    async FETCH_PROFILE({ commit }) {
      try {
        const { data } = await fetchProfile();
        commit("setNickname", data.name);
        commit("setEmail", data.email);
        console.log("여긴 vuex, 로그인 여부 확인중", data);
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
      const response = await googleLogin(code);
      console.log(response);
      if (response.data.statusCode == 200) {
        console.log("구글 로그인 성공");
        localStorage.setItem("refreshToken", response.data.refresh_token);
        saveAuthToCookie(response.data.access_token);
        commit("setNickname", response.data.name);
        commit("setEmail", response.data.email);
        commit("setOauthLoginState", true);
      }
    },
    // 카카오 로그인 요청
    async getKakaoLogin({ commit }, code) {
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
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});
