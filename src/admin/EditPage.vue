<template>
  <div id="main">
    <b-button variant="outline-secondary" class="mt-2 mb-2" @click="modalShow = !modalShow">添加信息</b-button>
    <b-button variant="outline-secondary" class="mt-2 mb-2 float-right" @click="submitBlog">发&nbsp&nbsp&nbsp&nbsp布</b-button>
    <b-modal v-model="modalShow" title="文章信息" @ok="submitBlogInfo" size="lg" no-close-on-backdrop no-close-on-esc>
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-group row">
          <label for="title" class="col-sm-1 col-form-label">标&nbsp&nbsp&nbsp&nbsp题</label>
          <div class="col-sm-11">
            <input type="text" class="form-control" id="title" placeholder="标题" v-model="article.title">
          </div>
        </div>
        <div class="form-group row">
          <label for="categorys" class="col-sm-1 col-form-label">分&nbsp&nbsp&nbsp&nbsp类</label>
          <div class="col-sm-4">
            <b-form-select :options="categoryNameArray" id="categorys" v-model="article.category"/>
          </div>
          <b-button variant="info" class="d-inline"><i class="fa fa-plus"></i></b-button>
        </div>
        <div class="form-group row">
          <label for="tags" class="col-sm-1 col-form-label">标&nbsp&nbsp&nbsp&nbsp签</label>
          <div class="col-sm-11">
            <input-tag :tags.sync="tagsArray" addTagOnBlur id="tags"></input-tag>
          </div>
        </div>
      </form>
    </b-modal>
    <b-modal ref="loadingModal" hide-footer title="Loading...">
      <vue-loading v-if="submitting" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
      <p v-else="!submitting">{{getResultInfo}}</p>
      <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">关 闭</b-btn>
    </b-modal>
    <mavon-editor ref="editor" v-model="value"/>
    <!--<vue-markdown :show=false :source="getSourceData" :toc=true :html=false @toc-rendered="handleData"></vue-markdown>-->
  </div>
</template>

<script>
import InputTag from 'vue-input-tag'
import VueMarkdown from 'vue-markdown'
import vueLoading from 'vue-loading-template'
import {getCategory, postBlogList} from "../api/api";

export default {
  name: 'EditPage',
  components: {
    'input-tag': InputTag,
    VueMarkdown,
    vueLoading,
  },
  data () {
    return {
      article:{
        title: '',
        category: '',
        tags: [1,2],
        md_content: '',
        md_TOC: ''
      },
      modalShow: false,
      categoryArray: [],
      categoryNameArray: [],
      tagsArray: ['hello', 'world'],
      value: '',
      md_TOC: '',
      submitting: true,
      resultInfo: '',
    }
  },
  computed: {
    getSourceData: function() {
      return this.value;
    },
    getResultInfo: function() {
      console.log(this.resultInfo);
      return this.resultInfo;
    }
  },
  methods: {
    submitBlogInfo() {
      this.handleSubmit();
    },
    handleSubmit() {
      console.log(this.article.category)
      console.log(this.categoryArray)
      for (let index in this.categoryArray) {
        if (this.article.category === this.categoryArray[index].name) {
          this.article.category = this.categoryArray[index].id;
        }
      }
    },
    handleData(data) {
      this.md_TOC = data;
      console.log(data)
    },
    submitBlog() {
      let MarkdownIt = require('markdown-it');
      let md = new MarkdownIt();
      this.article.md_content = md.render(this.value);
      this.article.md_TOC = this.md_TOC;

      this.submitting = true;
      this.$refs.loadingModal.show();
      console.log(this.article);
      this.postArticle();
    },
    hideModal() {
      this.$refs.loadingModal.hide();
    },

    getCategoryList(){
      getCategory().then((response) => {
        this.categoryArray = response.data;
        this.categoryNameArray = response.data.map((item) => {
          return item.name;
        });
        console.log(this.categoryNameArray)
      })
    },
    postArticle() {
      postBlogList({
        title: this.article.title,
        tags: this.article.tags,
        category: this.article.category,
        content: this.article.md_content,
      }).then((response) => {
        this.submitting = false;
        this.resultInfo = '上传成功！';
        console.log(response)
      }).catch(error => {
        this.submitting = false;
        for (let item in error) {
          if (error.hasOwnProperty(item)) {
            this.resultInfo += error[item][0];
            this.resultInfo += ', ';
          }
        }
      });
    }
  },
  mounted() {
    this.getCategoryList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/custom';

#main {
  height: 100%;
}
.markdown-body {
  position: absolute;
  width: 100%;
  top: 54px;
  bottom: 20px;
  left: 10px;
  right: 10px;
  z-index: 1;
}
input:focus, input:active, select:focus, select:active:focus, #tags:focus {
  outline: none;
  box-shadow: none;
  border-color: $blue;
}
#tags {
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
}
</style>
