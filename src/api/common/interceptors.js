import store from "@/store/index";
import axios from "axios";
import { reissueToken } from "@/api/auth";
import { getAuthFromCookie, saveAuthToCookie } from "@/utils/cookies.js";

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${getAuthFromCookie()}`;
      console.log(config);
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      console.log("에러일 경우", error);
      const errorAPI = error.config;
      if (error.response.status == 401) {
        errorAPI.retry = true;
        console.log("access 토큰이 만료됨 -> 토큰 재발급 요청");
        const tokenData = {
          refresh_token: store.state.refreshToken,
        };
        try {
          const data = await reissueToken(tokenData);
          console.log("토큰 재발급 결과", data);
          saveAuthToCookie(data.access_token);
          localStorage.setItem("refreshToken", data.refresh_token);
        } catch (error) {
          console.log("토큰 재발급 에러", error);
        }

        return await axios(errorAPI);
      }

      return Promise.reject(error);
    }
  );
  return instance;
}
