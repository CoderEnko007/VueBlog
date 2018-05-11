<template>
  <div class="blog">
    <blog-header v-on:search="doingSearch"/>
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <blog-list/>
          </div>
          <div class="col-lg-4">
            <b-list-group>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <router-link to="/">Cras justo odio</router-link>
                <b-badge variant="primary" pill>14</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <router-link to="/">Dapibus ac facilisis in</router-link>
                <b-badge variant="primary" pill>2</b-badge>
              </b-list-group-item>
              <b-list-group-item class="d-flex justify-content-between align-items-center">
                <router-link to="/">Morbi leo risus</router-link>
                <b-badge variant="primary" pill>1</b-badge>
              </b-list-group-item>
            </b-list-group>
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
      }
    }
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
