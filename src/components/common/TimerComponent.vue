<template>
  <div>
    {{ minutes }} :
    {{ seconds }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      totalTime: (5 * 60),
    }
  },
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },
    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },
    countdown() {
      if(this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.resetTimer;
      }
    }
  },
  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },
    seconds() {
      const seconds = this.totalTime - (this.minutes * 60);
      return this.padTime(seconds);
    }
  }
}
</script>

<style>

</style>