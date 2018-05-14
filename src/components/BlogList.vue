<template>
<div class="blog-list">
  <div class="row">
    <div class="col-lg-8">
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
    <div class="col-lg-4">
      <category-card v-on:filterByCategory="filterByCategory"/>
    </div>
  </div>
</div>
</template>

<script>
  import CategoryCard from '../components/CategoryCard'
  import { getBlogList } from "../api/api";

  export default {
    name: 'BlogList',
    components: {
      'categoryCard': CategoryCard,
    },
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
      if (this.$route.params.showCategory) {
        this.pageType = 'category';
        this.category = this.$route.params.category;
      }
      this.getListData();
    },
    computed: {
      paginationShow: function () {
        return this.postsNum / this.pageSize > 1;
      }
    },
    methods: {
      getListData() {
        console.log('getListData');
        console.log(this.pageType);
        switch (this.pageType) {
          case 'search': {
            getBlogList({
              search: this.searchWord,
              page: this.currentPage,
            }).then((response) => {
              this.listData = response.data.results;
              this.postsNum = response.data.count;
            }).catch(error => {
              console.log(error);
            });
          } break;
          case 'category': {
            getBlogList({
              category: this.category,
              page: this.currentPage,
            }).then((response) => {
              console.log(response.data)
              this.listData = response.data.results;
              this.postsNum = response.data.count;
            })
          } break;
          default: {
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
        }
      },
      pageChange(currentPage) {
        this.currentPage = currentPage;
        this.getListData();
      },
      // 生成文章发布日期
      getPostCreateDate(post) {
        let create_time = new Date(post.create_time);
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
      // 自动生成摘要
      getSummary(data) {
        let trimHtml = require('trim-html');
        let trimmed = trimHtml(data.content, {
          limit: 200,
          preserveTags: false,
          suffix: ' […]'
        });
        return trimmed.html;
      },
      // 按文章类别过滤文章
      filterByCategory(id) {
        this.$router.push({
          name: 'category',
          params: { category: id }
        })
      }
    },
    created() {
      console.log('created');
    },
    watch: {
      '$route': function(route) {
        console.log("BlogList watch route");
        console.log(route);
        console.log(route.params);
        this.currentPage = 1;
        switch (route.name) {
          case 'search': this.searchWord = route.params.keyword; break;
          case 'category': this.category = route.params.category; break;
          default:// main list
                break;
        }
        this.pageType = route.name;
        this.getListData();
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/custom';

.block>p {
  color: $meta-word;
  font: 300 15px/1.5em "Helvetica Neue", Helvetica, sans-serif;
}

</style>
