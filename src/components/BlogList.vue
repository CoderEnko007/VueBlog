<template>
<div class="blog-list">
  <div class="block mb-1 mb-sm-2 p-2 p-lg-3" v-for="post in listData">
    <h2 class="title mb-4">{{post.title}}</h2>
    <div class="post-meta mb-4">
      <b-img class="d-inline-block ml-1" rounded="circle" width="24" height="24" :src="post.author.logo" alt="头像"></b-img>
      <span class="small ml-1">{{post.author.nick_name}}</span>
      <span class="small ml-3">
        <i class="fa fa-calendar-times-o ml-2 mr-1"></i>
        {{getPostCreateDate(post)}}
      </span>
      <span class="small ml-3"><i class="fa fa-book mr-1"></i>{{post.category}}</span>
    </div>
    <p class="mb-4"><span v-html="getSummary(post)"></span></p>
    <div class="post-meta clearfix">
      <span class="small"><i class="fa fa-eye mr-2 ml-2"></i>{{post.click_nums}}</span>
      <b-button
        variant="link"
        class="float-right mr-5"
        :to="{name: 'posts', params: {id:post.id}}"
      >[阅读全文]</b-button>
    </div>
  </div>
  <b-pagination
    v-if="paginationShow"
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
  import { getBlogList, getBlogDetail } from "../api/api";

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
        category: 1,
        post_id: 1,
      }
    },
    mounted() {
      console.log('BlogList mounted');
      this.getAllData();
    },
    computed: {
      paginationShow: function () {
        return this.postsNum / this.pageSize > 1;
      }
    },
    methods: {
      getAllData() {
        console.log('BlogList getAllData '+this.$route.params.keyword);
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
        if(this.pageType === 'search') {
          getBlogList({
            search: this.searchWord,
            page: this.currentPage,
          }).then((response) => {
            this.listData = response.data.results;
            this.postsNum = response.data.count;
          }).catch(error => {
            console.log(error);
          });
        } else if (this.pageType === 'category'){
          getBlogList({
            category: this.category,
            page: this.currentPage,
          }).then((response) => {
            this.listData = response.data.results;
            this.postsNum = response.data.count;
          })
        } else if (this.pageType === 'post'){
          getBlogDetail(this.post_id)
            .then((response) => {
            console.log(response.data)
          })
        } else {
          // pageType == list
          getBlogList({
            page: this.currentPage,
          }).then((response) => {
            this.listData = response.data.results;
            this.postsNum = response.data.count;
          }).catch(error => {
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
          case 0: res = '今天发布'; break;
          case 1: res = '昨天发布'; break;
          case 2: res = '前天发布'; break;
          default:
            if(res <= 7) {
              res = res + '天前发布'
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
      },
    },
    watch: {
      '$route': function(route) {
        console.log("BlogList watch route");
        console.log(route);
        console.log(route.params);
        this.currentPage = 1;
        if(route.name==='search') {
          this.pageType = 'search';
          this.searchWord = route.params.keyword;
          this.getListData();
        } else if (route.name==='category') {
          this.pageType = 'category';
          this.category = route.params.category;
          this.getListData();
        } else if(route.name==='posts'){
          this.pageType = 'post';
          this.post_id = route.params.id;
          this.getListData();
        } else {
          // main list
          this.pageType = 'list';
          this.getListData();
        }
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   console.log('beforeRouteEnter')
    //   console.log(to)
    //   console.log(from)
    //   console.log(next)
    //   next()
    // },
    // beforeRouteUpdate(to, from, next) {
    //   console.log('beforeRouteUpdate')
    //   next()
    // }
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

</style>
