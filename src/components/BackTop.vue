<template>
<div class="topBtn">
  <button class="back-top" ref="topBtn" @click="scrollToTop(500)">
    <i class="fa fa-arrow-up" aria-hidden="true"></i>
  </button>
</div>
</template>
<script>
export default {
  name: 'BackTop',
  methods: {
    scrollToTop(scrollDuration) {
      let cosParameter = window.scrollY / 2,
      scrollCount = 0,
      oldTimestamp = performance.now();
      function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    },
    showTopBtn() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= 500) {
        this.$refs.topBtn.style.opacity = '0.5'
      } else {
        this.$refs.topBtn.style.opacity = '0'
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.showTopBtn)
  },
  destroyed () {
    window.removeEventListener('scroll', this.showTopBtn);
  }
}
</script>
<style lang="scss" scoped>
button:focus {
  outline: none;
}
.back-top {
  cursor: pointer;
  position: fixed;
  bottom: 60px;
  right: 60px;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 3px;
  background-color: #343a40;
  opacity: 0;
  color: #fff !important;
  line-height: 1;
  z-index: 99;
  transition: all 0.5s; // display 不支持transition效果，这里使用透明度实现淡入淡出效果
}
</style>
