import Vue from "vue";
import VueRouter from "vue-router";
import { getAuthFromCookie } from "@/utils/cookies";

Vue.use(VueRouter);

const routes = [
  // 온보딩 페이지
  {
    path: "/",
    component: () => import("@/views/OnBoardingView.vue"),
    beforeEnter: (to, from, next) => {
      if (getAuthFromCookie("accessToken")) {
        next("/main");
        console.log("로그인 함");
      } else {
        next();
        console.log("로그인 안 했음");
      }
    },
  },
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  // 메인
  {
    path: "/main",
    component: () => import("@/views/MainView.vue"),
    children: [
      // 카카오
      {
        path: "/main/kakao/redirect",
        component: () => import("@/views/MainView.vue"),
      },
      // 구글
      {
        path: "/main/google/redirect",
        component: () => import("@/views/MainView.vue"),
      },
    ],
  },
  // 회원가입
  {
    path: "/register",
    component: () => import("@/views/RegisterView.vue"),
    children: [
      // step1: 이메일 인증
      {
        path: "/register/email",
        component: () => import("@/components/auth/EmailForm.vue"),
      },
      // step2: 회원정보 입력
      {
        path: "/register/info",
        component: () => import("@/components/auth/RegisterForm.vue"),
      },
    ],
  },
  // 비밀번호 재설정
  {
    path: "/resetpw",
    component: () => import("@/views/ResetPwView.vue"),
    children: [
      // step1: 이메일 인증
      {
        path: "/resetpw/email",
        component: () => import("@/components/auth/ResetPwEmailForm.vue"),
      },
      // step2: 비밀번호 재설정
      {
        path: "/resetpw/:code",
        component: () => import("@/components/auth/ResetPwForm.vue"),
      },
    ],
  },
  {
    path: "/mypage",
    component: () => import("@/views/MypageView.vue"),
    children: [
      // 기본 회원가입
      {
        path: "/mypage",
        component: () => import("@/components/auth/MypageForm.vue"),
      },
      // 소셜 회원가입
      {
        path: "/mypage/sns",
        component: () => import("@/components/auth/MypageSnsForm.vue"),
      },
    ],
  },
  {
    path: "/category",
    component: () => import("@/views/CategoryView.vue"),
    children: [
      {
        path: "/category/all",
        component: () =>
          import("@/components/category/AllCategoryComponent.vue"),
      },
      {
        path: "/category/favorite",
        component: () =>
          import("@/components/category/FavoriteCategoryComponent.vue"),
      },
      {
        path: "/category/:id",
        component: () => import("@/components/category/CategoryComponent.vue"),
      },
    ],
  },
  // 콜렉션 상세 페이지
  {
    path: "/collection/:id",
    component: () => import("@/views/CollectionView.vue"),
  },
  // 검색 결과 페이지
  {
    path: "/search",
    component: () => import("@/views/SearchView.vue"),
  },
  // 404 에러 페이지
  {
    path: "*",
    redirect: "/404",
  },
  {
    path: "/404",
    component: () => import("@/views/404View.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,

  // 스크롤 초기화
  scrollBehavior() {
    window.scrollTo(0, 0);
  },
});

export default router;
