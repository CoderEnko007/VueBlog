<template>
  <b-card bg-variant="dark" text-variant="light" border-variant="light" class="text-center f16 px-0 mt-2">
    <p class="mb-2">撸起袖子加油干</p>
    <p>试一试 试一试</p>
  </b-card>
</template>

<script>
  export default {
    name: 'Footer',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/custom';

.card {
  color: #f4f4f4;
}
</style>
