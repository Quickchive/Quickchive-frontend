<template>
  <div class="hello">
    <h1>메인</h1>
    <span v-if="isUserLogin">{{ this.$store.state.userName }}님 환영합니다.</span>
    <button v-if="isUserLogin" @click="userLogout()">로그아웃</button>
  </div>
</template>

<script>
import { fetchProfile } from '@/api/user';
import { logoutUser } from '@/api/auth';
import { deleteCookie } from '@/utils/cookies';
export default {
    created() {
        // this.fetchName();
    },
    computed: {
        isUserLogin() {
            return this.$store.getters.isLogin;
        },
    },
    methods: {
        async fetchName() {
            try {
                const response = await fetchProfile();
                console.log(response.data);
                if (response.data.statusCode == 401) {
                    console.log("에러", response);
                    alert("로그인이 필요합니다.");
                    this.$router.push("/login");
                }
                else if (response.data.statusCode == 200) {
                    console.log(response.data.name);
                    this.$store.commit("setUserName", response.data.name);
                }
            }
            catch (error) {
                console.log(error);
            }
        },
        async userLogout() {
            try {
                const response = await logoutUser();
                console.log("로그아웃", response);
                deleteCookie("bookmark_auth");
                localStorage.removeItem("refreshToken");
                this.$store.commit("logoutUser");
            }
            catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>
</style>
