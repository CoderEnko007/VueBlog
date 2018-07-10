<template>
  <div class="content">
    <div v-show="show" class="row">
      <div class="col-lg-9">
        <b-breadcrumb class="bg-white mb-2" :items="items"/>
        <div class="bg-white mb-1 mb-sm-2 p-2 p-lg-3">
          <h2 class="title mb-3 text-primary">{{title}}</h2>
          <span class="small ml-3">作者 {{author}}&nbsp&nbsp·&nbsp&nbsp</span>
          <span class="small">{{formatCreateDate(time)}}&nbsp&nbsp·&nbsp&nbsp</span>
          <span class="small">{{click_nums}} 阅读</span>
          <hr class="mb-4">
          <span class="markdown-body" v-html="content"></span>
          <!--<vue-markdown class="markdown-body" :source="content"></vue-markdown>-->
        </div>
      </div>

      <div class="col-lg-3 ">
        <div class="toc-title">目录</div>
        <div class="toc-placeholder bg-white">
          {{msg}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getBlogDetail} from "../api/api";
  import VueMarkdown from 'vue-markdown';
  import { Loading } from 'element-ui';
  import {formatPostCreateDate} from "../utils";
  import autoToc from 'auto-toc'

  export default {
    name: 'Article',
    components: {
      VueMarkdown
    },
    data() {
      return {
        true1: true,
        post: '',
        msg: '目录占楼',
        title: '',
        author: '',
        time: '',
        click_nums: 0,
        content: '',
        show: false,
        items: [],
        loadingInstance: {},
      }
    },
    mounted() {
      this.loadingInstance = Loading.service({ target:"#blog-list" });
      getBlogDetail(this.$route.params.id)
        .then((response) => {
          this.post = response.data;
          this.title = this.post.title;
          this.author = this.post.author.nick_name;
          this.time = this.post.create_time;
          this.click_nums = this.post.click_nums;
          // this.content = this.post.md_content;
          this.content = this.post.content;

          this.items = [{
            text: "首页",
            to: '/'
          }, {
            text: this.post.category.name,
            to: {name:'category', params:{category:this.post.category.id}}
          }, {
            text: this.title,
            active: true
          }];
          this.show = true;
          this.loadingInstance.close();
          this.$nextTick(() => {
            autoToc('.markdown-body', '.toc-placeholder', {});
          })
      })

    },
    methods: {
      formatCreateDate(date) {
        console.log('formatCreateDate',date)
        return formatPostCreateDate(date)
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/custom';
hr {
  height: 1px;
  border: none;
  border-top: 1px solid rgba(0, 0, 0, 0.15);
}
.breadcrumb-item>a {
  color: #000;
  text-decoration: none;
  transition:all 0.05s;
}
.breadcrumb-item>a:active {
  color: #000;
  transition:all 0.05s;
}
.breadcrumb-item>a:hover {
  color: $pink;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '>';
}
.markdown-body h1, .markdown-body h2, .markdown-bodyh3,
.markdown-body h4, .markdown-body h5, .markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25rem;
}
.breadcrumb-item + .breadcrumb-item::before {
  content: '/'
}
.toc-title {
  padding: 10px 15px;
  background-color: white;
  border-bottom: 1px solid #eee;
}
.toc-placeholder {
  padding: 15px;
}

</style>
