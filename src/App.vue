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
</style>
