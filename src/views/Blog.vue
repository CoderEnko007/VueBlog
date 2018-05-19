<template>
  <div class="blog">
    <blog-header v-on:search="doingSearch"/>
    <div id="main" class="mt-4">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
    <blog-footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import BlogList from '../components/BlogList'
  import Footer from '../components/Footer'

  export default {
    name: 'Blog',
    components: {
      'blogHeader': Header,
      'blogList': BlogList,
      'blogFooter': Footer,
    },
    data () {
      return {
        searchWord: '',
      }
    },
    methods: {
      doingSearch(word) {
        this.searchWord = word;
        if(this.searchWord) {
          console.log('doingSearch');
          this.$router.push({
            name: 'search',
            params: { keyword: this.searchWord }
          });
        }
      },
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
