// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import BootstrapVue from 'bootstrap-vue'
import mavonEditor from 'mavon-editor'

import './axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import 'mavon-editor/dist/css/index.css'
import './assets/css/fontawesome-all.css'

import {MessageBox} from 'element-ui'
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(mavonEditor);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
