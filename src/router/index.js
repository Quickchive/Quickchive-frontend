import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // 메인 페이지 -> 로그인 페이지
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
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
  // 테스트용 (변경하기) verify
  {
    path: "/verify",
    component: () => import("@/components/auth/RegisterForm.vue"),
  },
  {
    path: "/mypage",
    component: () => import("@/components/MypageComponent.vue"),
  },
  {
    path: "/timer",
    component: () => import("@/components/common/TimerComponent.vue"),
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
