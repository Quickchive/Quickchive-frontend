import {
  getAccessTokenFromCookie,
  saveAccessTokenToCookie,
  getRefreshTokenFromCookie,
  saveRefreshTokenToCookie,
  deleteCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/auth';
import { getProfile } from '@/api/user';
import { logoutUser } from '@/api/auth';
import { googleLogin, kakaoLogin } from '@/api/oauth';

const authStore = {
  state: {
    nickname: '',
    email: '',
    loginState: false,
    oauthLoginState: false,
    accessToken: '' || getAccessTokenFromCookie(),
    refreshToken: '' || getRefreshTokenFromCookie(),
    oauthInfo: false || localStorage.getItem('oauthInfo'),
    oauthName: '' || localStorage.getItem('oauthInfo'),
    stayLoginState: false || localStorage.getItem('stayLogin'),
  },
  getters: {
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
    setUserInfo(state, { nickname, email }) {
      state.nickname = nickname;
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
      const response = await getProfile();
      commit('setUserInfo', {
        nickname: response.data.name,
        email: response.data.email,
      });
      commit('setLoginState', true);
      commit('setOauthLoginState', false);
    },
    async GET_PROFILE({ commit }) {
      try {
        const response = await getProfile();
        commit('setUserInfo', {
          nickname: response.data.name,
          email: response.data.email,
        });
        if (response.status === 201) {
          commit('setLoginState', true);
        } else if (response.status === 200) {
          commit('setLoginState', true);
        }
      } catch (error) {
        if (error.status === 401) {
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
          commit('setUserInfo', {
            nickname: response.data.name,
            email: response.data.email,
          });
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
          commit('setUserInfo', {
            nickname: response.data.name,
            email: response.data.email,
          });
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
