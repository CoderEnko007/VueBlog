<template>
  <div id="edit-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm" label-position="left">
      <sticky :className="'sub-navbar '+postForm.status" :zIndex="5">
        <el-button class="el-button--primary" @click="submitForm">发&nbsp;&nbsp;&nbsp;&nbsp;布</el-button>
      </sticky>
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="21">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput name="name" v-model="postForm.title" required :maxlength="100">
                标题
              </MDinput>
            </el-form-item>
            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="80px" label="文章类别:" class="postInfo-container-item">
                    <el-select clearable v-model="postForm.category">
                      <el-option v-for="item in categoryOption" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label-width="45px" label="标签:" class="postInfo-container-item">
                    <el-select style="min-width: 800px;"
                               v-model="postForm.tags" multiple filterable allow-create default-first-option placeholder="请选择文章标签">
                      <el-option v-for="item in tagsOption" :key="item.id" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item label-width="45px" label="摘要:">
          <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="postForm.summary">
          </el-input>
          <span class="word-counter" v-show="summaryLength">{{summaryLength}}字</span>
        </el-form-item>
        <div class="md-container">
          <mavon-editor v-model="postForm.md_content" @change="getContent"/>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
  import Sticky from './Sticky'
  import MDinput from './MDinput'
  import vueLoading from 'vue-loading-template'
  import {getCategory, postBlog, getBlogDetail, patchBlog, getTags} from "@/api/api";

  const defaultForm = {
    status: 'draft',
    title: '', // 产品名称
    summary: '', // 产品描述
    id: undefined,
    category: undefined,
    tags: [],
    content: '',
    md_content: ''
  }

  export default {
    name: 'articleDetail',
    components: {
      Sticky,
      MDinput,
      vueLoading,
    },
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        postForm: Object.assign({}, defaultForm),
        rules: {
          title: [
            {required: true, message: '请填写标题', trigger: 'blur'},
            {min: 6, message: '标题不能小于6个字符', trigger: 'blur'}
          ]
        },
        categoryOption: null,
        tagsOption: null,
      }
    },
    computed: {
      summaryLength() {
        return this.postForm.summary.length
      }
    },
    methods: {
      submitForm() {
        this.$refs['postForm'].validate((valid) => {
          if (valid) {
            if (this.postForm.md_content.length <= 0) {
              this.$notify({
                title: '警告',
                message: '文章内容不能为空',
                type: 'warning',
                duration: 2000
              })
              return
            }
            if (this.isEdit) {
              const id = this.postForm.id
              patchBlog(id, this.postForm).then(res => {
                this.$notify({
                  title: '成功',
                  message: '文章修改成功',
                  type: 'success',
                  duration: 2000
                })
                this.postForm.status = 'published'
                this.$router.push({name: 'listPage'})
              }).catch(err => {
                console.log(err)
                this.$notify.error({
                  title: '错误',
                  message: '文章修改失败'
                })
              })
            } else {
              console.log(this.postForm)
              postBlog(this.postForm).then(res => {
                this.$notify({
                  title: '成功',
                  message: '文章创建成功',
                  type: 'success',
                  duration: 2000
                })
                this.postForm.status = 'published'
                this.$router.push({name: 'listPage'})
              }).catch(err => {
                this.$notify.error({
                  title: '错误',
                  message: '创建失败:' + error
                })
              })
            }
          }
        })
      },
      fetchCategoryData() {
        getCategory().then(res => {
          this.categoryOption = res.data;
        }).catch(err => {
          this.handleError(err)
        });
      },
      fetchTagsData() {
        getTags().then(res => {
          this.tagsOption = res.data;
        }).catch(err => {
          this.handleError(err)
        });
      },
      fetchBlogDetail(id) {
        getBlogDetail(id).then(res => {
          this.postForm = res.data
          this.postForm.tags = res.data.tags.map(v => {
            return v.name
          })
          this.postForm.category = res.data.category.id
          if (!this.postForm.md_content) {
            this.postForm.md_content = this.postForm.content;
          }
          this.postForm.status = defaultForm.status
        }).catch(err => {
          console.log(err)
          this.$notify.error({
            title: '错误',
            message: '博客数据获取失败'
          })
        })
      },
      getContent(value, render) {
        this.postForm.md_content = value;
        this.postForm.content = render;
      },
    },
    mounted() {
      this.fetchCategoryData();
      this.fetchTagsData();
      if (this.isEdit) {
        const id = this.$route.params && this.$route.params.id
        this.fetchBlogDetail(id)
      } else {
        this.postForm = Object.assign({}, defaultForm)
        console.log(this.postForm)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../assets/css/custom';
  #edit-container {
    height: 100%;
    position: relative;
    .createPost-main-container {
      padding: 5px 45px 0 50px;
      .postInfo-container {
        position: relative;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
          width: 100%;
        }
      }
      .md-container {
        margin: 0 0 30px;
        .markdown-body {
          min-height: 800px;
        }
      }
      .word-counter {
        width: 40px;
        position: absolute;
        right: -10px;
        top: 0px;
      }
    }
  }

</style>
