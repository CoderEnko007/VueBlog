<template>
  <div class="content">
    <div v-show="show" class="row">
      <div class="col-lg-9">
        <b-breadcrumb class="bg-white mb-2" :items="items"/>
        <div class="bg-white mb-1 mb-sm-2 p-2 p-lg-3">
          <h2 class="title mb-3 text-primary" @click="test">{{title}}</h2>
          <span class="small ml-3">作者 {{author}}&nbsp&nbsp·&nbsp&nbsp</span>
          <span class="small">{{formatCreateDate(time)}}&nbsp&nbsp·&nbsp&nbsp</span>
          <span class="small">{{click_nums}} 阅读</span>
          <hr class="mb-4">
          <span class="markdown-body" v-html="content" ref="article"></span>
        </div>
      </div>

      <div class="col-lg-3">
        <div class="toc-container" ref="toc">
          <div class="toc-title">目录</div>
          <div class="toc-placeholder bg-white">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getBlogDetail} from "../api/api";
  import { Loading } from 'element-ui';
  import {formatPostCreateDate} from "../utils";
  import autoToc from 'auto-toc'

  export default {
    name: 'Article',
    data() {
      return {
        true1: true,
        post: '',
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
            // href: '/category/'+this.post.category.id
          }, {
            text: this.title,
            active: true
          }];
          this.show = true;
          this.loadingInstance.close();
          this.$nextTick(() => {
            this.generateAnchor(this.$refs.article)
            autoToc('.markdown-body', '.toc-placeholder', {});
          })
      })

      window.addEventListener('scroll', this.scrollPage)
    },
    destroyed () {
      window.removeEventListener('scroll', this.scrollPage);
    },
    methods: {
      formatCreateDate(date) {
        return formatPostCreateDate(date)
      },
      scrollPage() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop >= 56) {
          this.$refs.toc.style.top = scrollTop-56+'px'
        } else {
          this.$refs.toc.style.top = 0
        }
      },
      // 查找文章中的h标签，并添加id
      generateAnchor(contentRef) {
        let nodes = contentRef.children
        let nodeId = 0
        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            judageH(nodes[i] , i , nodes)
            function judageH(node , i , nodes) {
              let reg = /^H[1-6]{1}$/;
              if (reg.exec(node.tagName)) {
                nodes[i].setAttribute("id", '_'+nodeId++)
              }
            }
          }
        }
      },
      test() {
        this.$router.push({
          name: 'category',
          params: { category: 1 }
        });
      }
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
.breadcrumb-item + .breadcrumb-item::before {
  content: '/'
}
.toc-container {
  position: absolute;
  width: 100%;
  font-size: 14px;
  line-height: 1.8;
  .toc-title {
    padding: 10px 15px;
    background-color: white;
    border-bottom: 1px solid #eee;
  }
  .toc-placeholder {
    padding: 15px;
    a {
      overflow: hidden!important;
      text-overflow:ellipsis!important;
      white-space: nowrap!important;
      display: block!important;
    }
  }
}


</style>
