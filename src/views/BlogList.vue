<template>
<div id="blog-list" v-if="show">
  <div class="row">
    <div class="col-lg-8">
      <div class="block mb-1 mb-sm-2 p-2 p-lg-3" v-for="post in listData">
        <h2 class="title mb-4">{{post.title}}</h2>
        <div class="post-meta mb-4">
          <b-img class="d-inline-block ml-1" rounded="circle" width="24" height="24" :src="post.author.logo" alt="头像"></b-img>
          <span class="small ml-1">{{post.author.nick_name}}</span>
          <span class="small ml-3">
            <i class="fa fa-calendar-times-o ml-2 mr-1"></i>
            {{getPostCreateDate(post.create_time)}}
          </span>
          <span class="small ml-3"><i class="fa fa-book mr-1"></i>{{post.category}}</span>
        </div>
        <p class="mb-4"><span v-html="getSummary(post.content)"></span></p>
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
  import { mapGetters } from 'vuex'
  import CategoryCard from '../components/CategoryCard'
  import { getBlogList } from "../api/api";
  import { Loading } from 'element-ui';
  import {generateSummary, formatPostCreateDate} from "../utils";

  export default {
    name: 'BlogList',
    components: {
      'categoryCard': CategoryCard,
    },
    data () {
      return {
        listData: null, // 获取的数据列表
        pageType: 'list',
        postsNum: 0,
        pageSize: 5,
        post_id: 1,
        show: false,
        loadingInstance: {},
      }
    },
    computed: {
      ...mapGetters([
        'listQuery'
      ]),
      paginationShow: function () {
        return this.postsNum / this.pageSize > 1;
      }
    },
    methods: {
      fetchData() {
        this.loadingInstance = Loading.service({ target:"#blog-list" });
        getBlogList(this.listQuery).then(res => {
          this.handleResponse(res);
        }).catch(err => {
          this.handleError(err);
        })
      },
      handleResponse(response) {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.listData = response.data.results;
        this.postsNum = response.data.count;
        this.show = true;
        this.loadingInstance.close();
      },
      handleError(error) {
        this.loadingInstance.close();
        console.log(error)
      },

      pageChange(currentPage) {
        this.$store.dispatch('SetQueryPage', currentPage).then(() => {
          this.fetchData();
        }).catch(err => {
          this.handleError(err)
        })
      },
      // 生成文章发布日期
      getPostCreateDate(date) {
        return formatPostCreateDate(date)
      },
      // 自动生成摘要
      getSummary(content) {
        return generateSummary(content)
      },
      // 按文章类别过滤文章
      filterByCategory(id) {
        this.$store.dispatch('SetQueryCategory', id).then(() => {
          this.fetchData();
        }).catch(err => {
          this.handleError(err)
        })
      }
    },

    mounted() {
      if (this.$route.name === 'index') {
        this.$store.dispatch('ResetQueryList').then(() => {
          this.fetchData()
        }).catch(err => {
          this.handleError(err)
        })
      } else {
        this.fetchData()
      }
    }
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
