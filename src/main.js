// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import mavonEditor from 'mavon-editor'
import './router/permission'

import './axios'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.css'
import 'mavon-editor/dist/css/index.css'
import './assets/css/fontawesome-all.css'
import '../node_modules/mavon-editor/resources/markdown/github-markdown.min.css'
import 'element-ui/lib/theme-chalk/display.css';

import {
  Button,
  Dialog,
  Form,
  FormItem,
  Input,
  Menu,
  Submenu,
  MenuItem,
  Tooltip,
  Table,
  TableColumn,
  Pagination,
  Select,
  Option,
  Row,
  Col,
  Card,
  Tag,
  badge,

  Message,
  MessageBox,
  Loading,
  Notification
} from 'element-ui'
Vue.use(Button);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Tooltip);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Option);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Tag);
Vue.use(badge);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

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
