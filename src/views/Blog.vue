<template>
  <div class="blog">
    <blog-header v-on:search="doingSearch"/>
    <div class="main">
      <div class="container">
        <div class="row">
          <div v-if="showList" class="col-lg-8">
            <blog-list/>
          </div>
          <div v-else class="col-lg-8">
            <router-view></router-view>
          </div>
          <div class="col-lg-4">
            <category-card v-on:filterByCategory="filterByCategory"/>
          </div>
        </div>
      </div>
    </div>
    <blog-footer/>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import BlogList from '../components/BlogList'
  import Footer from '../components/Footer'
  import CategoryCard from '../components/CategoryCard'

  export default {
    name: 'Blog',
    components: {
      'blogHeader': Header,
      'blogList': BlogList,
      'blogFooter': Footer,
      'categoryCard': CategoryCard,
    },
    data () {
      return {
        searchWord: '',
      }
    },
    computed: {
      showList: function() {
        return this.$route.name === 'blog';
      },
    },
    mounted() {

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
      filterByCategory(id) {
        this.$router.push({
          name: 'category',
          params: { category: id }
        })
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/pink-style';
.main {
  margin-top: 40px;
}
.list-group-item>a {
  color: $meta-word;
  text-decoration: none;
}
.list-group-item>a:hover {
  color: $pink;
}
</style>
