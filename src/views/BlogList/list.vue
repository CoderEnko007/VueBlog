<template>
<div class="article-list-container">
  <div class="article-card mb-1 mb-sm-2 p-2 p-lg-3" v-for="item in listData">
    <h2 class="title mb-4">{{item.title}}</h2>
    <div class=" mb-4">
      <b-img class="d-inline-block ml-1" rounded="circle" width="24" height="24" :src="item.author.logo" alt="头像"></b-img>
      <span class="small ml-1">{{item.author.nick_name}}</span>
      <span class="small ml-3">
            <i class="fa fa-calendar-times-o ml-2 mr-1"></i>
            {{getPostCreateDate(item.create_time)}}
          </span>
      <span class="small ml-3">
            <router-link :to="'/category/'+item.category.id" ><i class="fa fa-book mr-1"></i>{{item.category.name}}
            </router-link>
          </span>
    </div>
    <p class="mb-4"><span v-html="getSummary(item.content)"></span></p>
    <div class="article-card-footer clearfix">
      <span class="small"><i class="fa fa-eye mr-2 ml-2"></i>{{item.click_nums}}</span>
      <div class="article-tags ml-3 small" style="display: inline-block;">
        <i class='fas fa-tags'></i>
        <span v-for="(tag, index) in item.tags">{{tag}}<span v-if="index !== item.tags.length-1">, </span></span>
      </div>
      <b-button variant="link" class="float-right mr-5" :to="{name: 'posts', params: {id:item.id}}"
      >[阅读全文]</b-button>
    </div>
  </div>
  <b-pagination v-if="paginationShow" class="mt-4 mb-4" align="center" size="md"
                :total-rows="postsNum" :per-page="pageSize" @change="pageChange">
  </b-pagination>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getBlogList } from "@/api/api";
import {generateSummary, formatPostCreateDate} from "@/utils/index";
export default {
  name: 'list',
  // props: ['listData'],
  data() {
    return {
      listData: null, // 获取的数据列表
      postsNum: 0,
      pageSize: 5,
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
      console.log('fetchData')
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
    },
    handleError(error) {
      this.$notify.error({
        title: '错误',
        message: '数据获取失败'
      })
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
        this.fetchData()
      })
    },
    // 按文章标签过滤文章
    filterByTag(id) {
      this.$store.dispatch('SetQueryTag', id).then(() => {
        this.fetchData()
      })
    },
    resetFilter() {
      this.$store.dispatch('ResetQueryList').then(() => {
        this.fetchData()
      })
    }
  },
  mounted() {
    console.log('list mounted', this.$route.name, this.$route.params)
    switch (this.$route.name) {
      case 'list': {
        this.resetFilter()
        break
      }
      case 'category': {
        this.filterByCategory(this.$route.params.category)
        break
      }
      case 'tags': {
        this.filterByTag(this.$route.params.tag)
        break
      }
      default: {
        this.fetchData()
      }
    }
  },
  watch: {
    '$route': function (route) {
      console.log('list watch', route.name)
      if (this.$route.name === 'list') {
        this.resetFilter()
      } else {
        this.fetchData()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/custom';
.article-card {
  background-color: #fff;
  transition: all 0.3s;
  p {
    color: $meta-word;
    font: 300 15px/1.5em "Helvetica Neue", Helvetica, sans-serif;
  }
  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.275);
  }
  .article-card-footer {
    height: 38px;
    line-height: 38px;
  }
}
</style>
