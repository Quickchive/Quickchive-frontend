<template>
  <div class="register-view">
    <!-- 회원가입 폼 -->
    <register-form @showTosModal="showTosModal" @showPolicyModal="showPolicyModal" :isTosModalActive="isTosModalActive" :isPolicyModalActive="isPolicyModalActive"></register-form>
    <!-- 이용 약관 모달 -->
    <modal-component v-if="isTosModalActive">
      <tos-modal @close-modal="isTosModalActive = false"></tos-modal>
    </modal-component>
    <modal-component v-if="isPolicyModalActive">
      <!-- 개인정보 처리 방침 모달 -->
      <policy-modal @close-modal="isPolicyModalActive = false"></policy-modal>
    </modal-component>
  </div>
</template>

<script>
import RegisterForm from '../components/auth/RegisterForm.vue';
import ModalComponent from '../components/modal/ModalComponent.vue';
import PolicyModal from '../components/modal/PolicyModal.vue';
import TosModal from '../components/modal/TosModal.vue';
export default {
  components: { RegisterForm, ModalComponent, TosModal, PolicyModal },
  data() {
    return {
      isPolicyModalActive: false,
      isTosModalActive: false,
    }
  },
  methods: {
    showTosModal(isTosModalActive) {
      this.isTosModalActive = isTosModalActive;
    },
    showPolicyModal(isPolicyModalActive) {
      this.isPolicyModalActive = isPolicyModalActive;
    }
  },
}
</script>

<style>
</style>