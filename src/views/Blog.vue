<template>
  <div class="blog">
    <blog-header v-on:search="doingSearch"/>
    <div id="main" class="mt-4">
      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view :key="key"></router-view>
        </transition>
      </div>
    </div>
    <blog-footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import BlogList from './BlogList'
  import Footer from '../components/Footer'

  export default {
    name: 'Blog',
    components: {
      'blogHeader': Header,
      'blogList': BlogList,
      'blogFooter': Footer,
    },
    computed: {
      key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
      }
    },
    methods: {
      doingSearch(word) {
        this.$store.dispatch('SetSearchWord', word).then(() => {
          this.$router.push({
            name: 'search',
            params: { keyword: word }
          });
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/custom';

.list-group-item>a {
  color: $meta-word;
  text-decoration: none;
}
.list-group-item>a:hover {
  color: $pink;
}
.container {
  min-height: 800px;
}
</style>
