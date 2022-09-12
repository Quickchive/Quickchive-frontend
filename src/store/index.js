import Vue from "vue";
import Vuex from "vuex";

import authStore from "@/store/modules/authStore.js";
import postStore from "@/store/modules/postStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // 키: 값 형태로 저장됩니다.
    authStore: authStore,
    postStore: postStore,
  },
});
