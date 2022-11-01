<template>
  <div>
    <div class="error-msg__wrapper">
      <div class="error-msg">{{ this.message }}</div>
      <div class="error-msg">({{ minutes }} : {{ seconds }})</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      totalTime: 5 * 60,
    };
  },
  props: {
    message: {
      default: "인증메일을 확인해주세요.",
      type: String,
    },
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.totalTime = 5 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.timer = setInterval(() => this.countdown(), 1000);
    },
    resetTimer() {
      this.totalTime = 5 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.startTimer();
    },
    padTime(time) {
      return (time < 10 ? "0" : "") + time;
    },
    countdown() {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.message = "인증시간이 만료되었습니다.";
      }
    },
    stopTimer(timerMessage) {
      this.totalTime = 0;
      this.timerMessage = timerMessage;
    },
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    },
  },
};
</script>

<style></style>
