import axios from "axios";
import store from "@/store/index.js";
import { reissueToken } from "@/api/auth";
import { getAuthFromCookie } from "@/utils/cookies.js";

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${getAuthFromCookie()}`;
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
          refresh_token: localStorage.getItem("refreshToken"),
        };
        try {
          const response = await reissueToken(tokenData);
          console.log("토큰 재발급 결과", response.data);
          await store.dispatch("RENEW_TOKEN", response.data.access_token);
          await store.dispatch(
            "RENEW_REFRESH_TOKEN",
            response.data.refresh_token
          );
          errorAPI.headers.Authorization = `Bearer ${response.data.access_token}`;
          return await axios(errorAPI);
        } catch (error) {
          console.log("토큰 재발급 에러", error);
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
