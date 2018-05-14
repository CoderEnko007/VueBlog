<template>
  <div id="main">
    <!--<div class="article-info p-2">-->
      <!--<b-form-group horizontal label="主&nbsp&nbsp&nbsp&nbsp题"-->
                    <!--label-for="title" :label-cols="1"-->
                    <!--label-class="pl-3">-->
        <!--<b-form-input id="title"></b-form-input>-->
      <!--</b-form-group>-->
      <!--<b-form-group horizontal label="主&nbsp&nbsp&nbsp&nbsp题"-->
                    <!--label-for="title" :label-cols="1"-->
                    <!--label-class="pl-3">-->
        <!--<b-form-input id="title"></b-form-input>-->
      <!--</b-form-group>-->
      <!--<b-form-group horizontal label="主&nbsp&nbsp&nbsp&nbsp题"-->
                    <!--label-for="title" :label-cols="1"-->
                    <!--label-class="pl-3">-->
        <!--<b-form-input id="title"></b-form-input>-->
      <!--</b-form-group>-->
    <!--</div>-->
    <b-button variant="outline-secondary" class="mt-2 mb-2" @click="modalShow = !modalShow">添加信息</b-button>
    <b-modal v-model="modalShow" title="文章信息" @ok="addBlogInfo" size="lg" no-close-on-backdrop no-close-on-esc>
      <form @submit.stop.prevent="handleSubmit">
        <div class="form-group row">
          <label for="title" class="col-sm-1 col-form-label">标&nbsp&nbsp&nbsp&nbsp题</label>
          <div class="col-sm-11">
            <input type="text" class="form-control" id="title" placeholder="标题">
          </div>
        </div>
        <div class="form-group row">
          <label for="blogCategory" class="col-sm-1 col-form-label">1分&nbsp&nbsp&nbsp&nbsp类</label>
          <div class="col-sm-4">
            <b-form-select :options="category" id="blogCategory"/>
          </div>
        </div>
      </form>
    </b-modal>
    <mavon-editor v-model="value"/>
  </div>
</template>

<script>
export default {
  name: 'EditPage',
  data () {
    return {
      value: '',
      modalShow: false,
      title: '',
      category:['test1', 'test2', 'test3'],
      tags: ['hello', 'world'],
    }
  },
  methods: {
    addBlogInfo() {
      this.handleSubmit();
    },
    handleSubmit() {

    },
    addBlogInfo() {

    },
    handleTagsChange(index, text) {

    }
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
  z-index: -1;
}
input:focus, input:active, select:focus, select:active:focus{
  outline: none;
  box-shadow: none;
  border-color: $blue;
}
</style>
