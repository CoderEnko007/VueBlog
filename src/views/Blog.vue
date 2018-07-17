<template>
  <div class="blog">
    <blog-header v-on:search="doingSearch"/>
    <div id="main" class="mt-4">
      <div class="container">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
        <BackTop></BackTop>
      </div>
    </div>
    <blog-footer/>
  </div>
</template>

<script>
  import Header from '@/components/Header'
  import BlogList from './BlogList/index'
  import Footer from '@/components/Footer'
  import BackTop from '@/components/BackTop'

  export default {
    name: 'Blog',
    components: {
      'blogHeader': Header,
      'blogList': BlogList,
      'blogFooter': Footer,
      BackTop
    },
    computed: {
      // 1. 给路由加上唯一的key可以在每次路由改变时刷新路由，避免多个路由使用同一组件不触发mounted的问题。
      // 2. 但是在实现文章目录功能时，需要跳转到锚点，会改变路由名称，导致刷新路由
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
#main {
  /*margin-top: 70px!important;*/
}
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
