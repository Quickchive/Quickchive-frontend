import {
  getAccessTokenFromCookie,
  saveAccessTokenToCookie,
  getRefreshTokenFromCookie,
  saveRefreshTokenToCookie,
  deleteCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';
import { fetchProfile } from '@/api/user';
import { logoutUser } from '@/api/auth';
import { googleLogin, kakaoLogin } from '@/api/oauth';

const authStore = {
  state: {
    nickname: '',
    email: '',
    loginState: false || getAccessTokenFromCookie(),
    oauthLoginState: false,
    accessToken: '' || getAccessTokenFromCookie(),
    refreshToken: '' || getRefreshTokenFromCookie(),
    oauthInfo: false || localStorage.getItem('oauthInfo'),
    oauthName: '' || localStorage.getItem('oauthInfo'),
    stayLoginState: false || localStorage.getItem('stayLogin'),
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
    // 소셜 정보 가져옴
    getOauthName(state) {
      return state.oauthName;
    },
    getNickname(state) {
      return state.nickname;
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
    logoutUser(state) {
      state.nickname = '';
      state.email = '';
      state.accessToken = '';
      state.refreshToken = '';
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      localStorage.removeItem('oauthInfo');
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
  },
  actions: {
    // 로그인
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      commit('setRefreshToken', data.refresh_token);
      saveAccessTokenToCookie(data.access_token);
      saveRefreshTokenToCookie(data.refresh_token);
      const response = await fetchProfile();
      commit('setNickname', response.data.name);
      commit('setEmail', response.data.email);
      commit('setLoginState', true);
      commit('setOauthLoginState', false);
    },
    async FETCH_PROFILE({ commit }) {
      try {
        const { data } = await fetchProfile();
        commit('setNickname', data.name);
        commit('setEmail', data.email);
        if (data.statusCode == 201) {
          commit('setLoginState', true);
        } else if (data.statusCode == 200) {
          commit('setLoginState', true);
        }
      } catch (error) {
        if (error.statusCode == 401) {
          commit('setLoginState', false);
        }
      }
    },
    // 로그아웃
    async LOGOUT({ commit }) {
      try {
        const refreshToken = {
          refresh_token: getRefreshTokenFromCookie(),
        };
        await logoutUser(refreshToken);
        commit('logoutUser');
      } catch (error) {
        console.log(error);
      }
    },
    // 구글 로그인 요청
    async GOOGLE_LOGIN({ commit }, code) {
      try {
        const response = await googleLogin(code);
        if (response.data.statusCode == 200) {
          saveRefreshTokenToCookie(response.data.refresh_token);
          saveAccessTokenToCookie(response.data.access_token);
          commit('setNickname', response.data.name);
          commit('setEmail', response.data.email);
          commit('setOauthLoginState', true);
          commit('setLoginState', false);
          commit('setRefreshToken', response.data.refresh_token);
        }
      } catch (error) {
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 카카오 로그인 요청
    async KAKAO_LOGIN({ commit }, code) {
      try {
        const response = await kakaoLogin(code);
        if (response.data.statusCode == 200) {
          saveRefreshTokenToCookie(response.data.refresh_token);
          saveAccessTokenToCookie(response.data.access_token);
          commit('setNickname', response.data.name);
          commit('setEmail', response.data.email);
          commit('setOauthLoginState', true);
          commit('setLoginState', false);
          commit('setRefreshToken', response.data.refresh_token);
        }
      } catch (error) {
        this.alertModalContent = error.response.data.message;
        this.isAlertModalActive = true;
      }
    },
    // 액세스 토큰 갱신
    RENEW_TOKEN({ commit }, accessToken) {
      commit('setAccessToken', accessToken);
      saveAccessTokenToCookie(accessToken);
    },
    // 리프레시 토큰 갱신
    RENEW_REFRESH_TOKEN({ commit }, refreshToken) {
      commit('setRefreshToken', refreshToken);
      saveRefreshTokenToCookie(refreshToken);
    },
    // 로그인 유지
    STAY_LOGIN({ commit }, stayLoginState) {
      commit('setStayLoginState', stayLoginState);
      localStorage.setItem('stayLogin', stayLoginState);
    },
  },
};

export default authStore;
