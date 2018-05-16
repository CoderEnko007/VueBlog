<template>
  <div id="header">
    <b-navbar class="blog-nav bg-white" toggleable="md" type="light">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand class="font-weight-bold ml-5">
        <router-link to="/">{{title}}</router-link>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav class="ml-auto mr-5">
          <b-nav-item class="mr-4" to="/">
            <a class="nav-item"><i class="fa fa-home mr-2"></i>首&nbsp&nbsp&nbsp&nbsp页</a>
          </b-nav-item>
          <b-nav-item href="#" class="mr-4"><a class="nav-item">归&nbsp&nbsp&nbsp&nbsp档</a></b-nav-item>
          <b-nav-item class="mr-5" to="/helloworld">
              <a class="nav-item">关&nbsp&nbsp&nbsp&nbsp于</a>
          </b-nav-item>
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2 search-input" type="text" v-model="searchWord" placeholder="Search"/>
            <b-button variant="outline-primary" size="sm"
                      class="my-2 my-sm-0" type="submit"
                      @click="search" >搜 索</b-button>
            <div>
              <i class="editEntry fa fa-sign-in ml-3" @click="showModal"></i>
              <b-modal ref="modal" v-model="modalShow" title="请登录" @ok="login">
                <form class="mt-3 mb-3" @submit.stop.prevent="handleSubmit">
                  <b-form-input class="form-input" v-model="username" placeholder="用户名"></b-form-input>
                  <b-form-input type="password" class="form-input" v-model="password" placeholder="密码"></b-form-input>
                  <div v-show="loading">
                    <vue-loading v-if="!loginFailedFlag" type="bars" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading>
                    <p v-else="loginFailedFlag">{{getFailedInfo}}</p>
                  </div>
                </form>
              </b-modal>
            </div>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {login, getUserDetail} from "../api/api";
import cookie from '../assets/js/cookie'
import vueLoading from 'vue-loading-template'

export default {
  name: 'Header',
  components: {
    vueLoading
  },
  computed: {
    getFailedInfo: function() {
      console.log(this.failedInfo)
      return this.failedInfo;
    }
  },
  data () {
    return {
      title: "袁方的博客",
      searchWord:'',
      modalShow: false,
      username: '',
      password: '',
      userInfo: '',
      loading: false,
      loginFailedFlag: false,
      failedInfo: 'aaa',
    }
  },
  methods: {
    search(evt) {
      evt.preventDefault();
      if(this.searchWord !== '') {
        this.$emit('search', this.searchWord)
      }
    },
    login(evt) {
      this.loading=false;
      this.failedInfo = '';
      this.loginFailedFlag = false;
      console.log(this.loginFailedFlag);
      evt.preventDefault();
      if(!this.username || !this.password) {
        alert("请输入用户名密码！")
      } else {
        this.handleSubmit();
      }
    },
    handleSubmit () {
      console.log("handleSubmit");
      console.log(this.username, this.password);
      this.loading = true;
      login({
        username: this.username,
        password: this.password
      }).then((response) => {
        cookie.setCookie('token',response.data.token,7);
        console.log(response.data.token);
        this.getUserInfo();
      }).catch(error => {
        console.log(error);
        this.failedInfo = '用户认证失败！';
        this.loginFailedFlag = true;
      });
    },
    getUserInfo() {
      getUserDetail().then((response) => {
        console.log(response);
        this.userInfo = response.data;
        cookie.setCookie('name', this.userInfo.name);
        this.$store.dispatch('setInfo');
        console.log('getUserInfo router to admin');
        this.$router.push({
          name: 'admin'
        })
      }).catch(error => {
        this.failedInfo = '用户数据获取失败！';
        this.loginFailedFlag = true;
        console.log(error);
      });
    },
    showModal() {
      this.loading=false;
      this.failedInfo = '';
      this.loginFailedFlag = false;
      this.$refs.modal.show();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/custom';
a {
  color: inherit;
  text-decoration: none;
}
/*导航栏下边框阴影*/
.blog-nav {
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
}
/*导航栏item渐变样式*/
.nav-link>a {
  color: #000;
  transition:all 0.05s;
}
.nav-link>a:hover {
  color: $pink;
}
.editEntry {
  cursor: pointer;
}
.editEntry:hover {
  color: $pink;
}
.form-input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
}

</style>
