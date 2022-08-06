<template>
<div>
  <h1>이메일 인증</h1>
</div>

</template>

<script>
import { verifyEmail } from '@/api/auth';
export default {
  created() {
    this.verifyEmail();
  },
  methods: {
    async verifyEmail() {
      try {
        const code =  this.$route.query.code;
        const response = await verifyEmail(code);
        console.log(response);
      } catch (error) {
        console.log(error);
      } 
    }
  },
}
</script>

<style>

</style>