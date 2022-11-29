import axios from 'axios';
import store from '@/store/index.js';
import { reissueToken } from '@/api/auth';
import { getAccessTokenFromCookie } from '@/utils/cookies.js';

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${getAccessTokenFromCookie()}`;
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    async function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      const errorAPI = error.config;
      if (error.response.status == 401) {
        errorAPI.retry = true;
        const tokenData = {
          refresh_token: localStorage.getItem('refreshToken'),
        };
        try {
          const response = await reissueToken(tokenData);
          await store.dispatch('RENEW_TOKEN', response.data.access_token);
          await store.dispatch(
            'RENEW_REFRESH_TOKEN',
            response.data.refresh_token
          );
          errorAPI.headers.Authorization = `Bearer ${response.data.access_token}`;
          return await axios(errorAPI);
        } catch (error) {
          console.log(error);
        }
      }
      return Promise.reject(error);
    }
  );
  return instance;
}
