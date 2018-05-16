<template>
  <div>
    <h2>bars</h2>
    <vue-loading type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
    <p>{{msg}}</p>
  </div>
</template>

<script>
  import vueLoading from 'vue-loading-template'
  export default {
    name: 'ListPage',
    components: {
      vueLoading
    },
    data () {
      return {
        msg: 'Welcome to ListPage'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
