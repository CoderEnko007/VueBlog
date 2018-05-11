<template>
<div class="blog-list">
  <div class="block mb-1 mb-sm-2 p-2 p-lg-3" v-for="post in listData">
    <h2 class="title mb-4">{{post.title}}</h2>
    <div class="post-meta mb-4">
      <b-img rounded="circle" width="24" height="24" :src="post.author.logo" alt="头像"></b-img>
      <span class="small">{{post.author.nick_name}}</span>
      <span class="small ml-3"><i class="fa fa-calendar-times-o ml-2 mr-1"></i>{{getPostCreateDate(post)}}</span>
      <span class="small ml-3"><i class="fa fa-book mr-1"></i>{{post.category}}</span>
    </div>
    <p class="mb-4"><span v-html="getSummary(post)"></span></p>
    <div class="post-meta">
      <span class="small"><i class="fa fa-eye mr-2 ml-2"></i>{{post.click_nums}}</span>
      <router-link to="#" class="float-right mr-4">[阅读全文]</router-link>
    </div>
  </div>
  <b-pagination
    v-if="postsNum/pageSize"
    class="mt-4 mb-4"
    align="center"
    size="md"
    :total-rows="postsNum"
    v-model="currentPage"
    :per-page="pageSize"
    @change="pageChange">
  </b-pagination>
</div>
</template>

<script>
  import { getBlogList } from "../api/api";

  export default {
    name: 'BlogList',
    data () {
      return {
        pageType: 'list',
        currentPage: 1,
        searchWord: '',
        listData: [],
        postsNum: 0,
        pageSize: 5,
      }
    },
    mounted() {
      console.log('BlogList mounted');
      this.getAllData();
    },
    methods: {
      getAllData() {
        console.log(this.$route.params.keyword);
        if(this.$route.params.keyword) {
          this.pageType = 'search';
          this.searchWord = this.$route.params.keyword;
        } else {
          this.pageType = 'list';
        }
        this.getListData();
      },
      getListData() {
        console.log(this.pageType);
        if(this.pageType === 'list'){
          getBlogList({
            page: this.currentPage,
          }).then((response) => {
            this.listData = response.data.results;
            this.postsNum = response.data.count;
            console.log('list:'+this.postsNum, this.listData);
          }).catch(error => {
            console.log('BlogList getListData 1');
            console.log(error);
          });
        } else {
          getBlogList({
            search: this.searchWord,
            page: this.currentPage,
          }).then((response) => {
            this.listData = response.data.results;
            this.postsNum = response.data.count;
            console.log('search:'+this.postsNum, this.listData);
          }).catch(error => {
            console.log('BlogList getListData 2');
            console.log(error);
          });
        }
      },
      pageChange(currentPage) {
        this.currentPage = currentPage;
        this.getListData();
      },
      getPostCreateDate(post) {
        let create_time = new Date(post.create_time)
        let now = new Date().getTime();
        let day = Math.abs(now-create_time.getTime());
        let res = new Date(day).getDate()-1;

        switch (res) {
          case 0: res = '今天'; break;
          case 1: res = '昨天'; break;
          case 2: res = '前天'; break;
          default:
            if(res <= 7) {
              res = res + '天前'
            } else {
              res = post.create_time;
            }
        }
        return res
      },
      getSummary(data) {
        let trimHtml = require('trim-html');
        let trimmed = trimHtml(data.content, {
          limit: 200,
          preserveTags: false,
          suffix: ' […]'
        });
        return trimmed.html;
      }

    },
    watch: {
      '$route': function(route) {
        console.log(route);
        console.log(route.params.keyword)
        if(route.params.keyword) {
          this.pageType = 'search';
          this.currentPage = 1;
          this.searchWord = route.params.keyword;
          this.getListData();
        } else if (route.path==='/'){
          this.pageType = 'list';
          this.currentPage = 1;
          this.getListData();
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/pink-style.scss';

.block {
  background-color: #fff;
}
.block:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.275);
}
.small {
  color: $meta-word;
}
.title {
  color: $meta-word;
}
.block>p {
  color: $meta-word;
  font: 300 15px/1.5em "Helvetica Neue", Helvetica, sans-serif;
}
.post-meta>img {
  display: inline-block;
}

</style>
