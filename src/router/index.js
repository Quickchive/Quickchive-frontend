import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		component: () => import('@/components/HelloWorld.vue'),
	},
	{
		path: '/register',
		component: () => import('@/components/auth/RegisterForm.vue'),
	},
	{
		path: '/verify',
		component: () => import('@/components/auth/VerifyComponent.vue'),
	},

];

const router = new VueRouter({
	mode: 'history',
	routes,

	// 스크롤 초기화
	scrollBehavior() {
		window.scrollTo(0, 0);
	},
});

export default router;
