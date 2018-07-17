<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '../scss/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
body,div,h1,h2,h3,h4,h5,h6,p,form,fieldset,legend,input{ margin:0; padding:0;}
ol,ul{ list-style:none;}
ul {padding-left: 10px;}
img,fieldset{ border:0 none; display:block;}
html, body, #app {height: 100%;}
body {
  background-color: $bgcolor;
}
a {
  text-decoration: none!important;
  .active {
    color: $pink!important;
  }
}

.btn:focus, .btn.focus, .btn:active:focus,
.btn:active.focus, .btn.active:focus,
.btn.active.focus, input:focus, input:active,
select:focus, select:active:focus {
  outline: none;
  box-shadow: none;
}
* {
  box-sizing: border-box;
  outline: none;
}
.toc-placeholder {
  a {
    color: #007bff;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    display: block;
    &:hover, &:active, &:focus, &:focus-within {
      color: $pink;
    }
  }
}
.markdown-body h1, .markdown-body h2, .markdown-body h3,
.markdown-body h4, .markdown-body h5, .markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25rem;
}
.el-card__header {
  padding: 12px 20px;
}
.el-card__body {
  padding: 15px;
  .tags-container {
    display: inline-block;
    margin: 4px;
    .el-tag {
      transition: all 0.3s;
      &:hover {
        background-color: $pink;
        color: #fff;
      }
    }
  }
}
</style>
