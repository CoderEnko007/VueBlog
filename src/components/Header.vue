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
            <i class="adminEntry fas fa-sign-in-alt ml-3" @click="handleLogin"></i>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>

      <el-dialog class="login-dialog" title="登陆后台" :visible.sync="dialogVisible" width="30%">
        <el-form class="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <el-form-item prop="username">
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input name="password" type="password" @keyup.enter.native="LoginSubmit" v-model="loginForm.password" autoComplete="on"
                      placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="LoginSubmit">
              登 陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Message } from 'element-ui'

export default {
  name: 'Header',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          {min: 6, message: '密码不能少于6位', trigger: 'blur'}
        ]
      },
      title: "袁方的博客",
      searchWord:'',
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    search(evt) {
      evt.preventDefault();
      if(this.searchWord !== '') {
        this.$emit('search', this.searchWord)
      }
    },
    resetFormData() {
      this.loginForm = {
        username: '',
          password: ''
      }
    },
    handleLogin() {
      if (this.token) {
        this.$router.push({ name: 'admin'})
      } else {
        this.resetFormData()
        this.dialogVisible = true
        this.$nextTick(() => {
          this.$refs['loginForm'].clearValidate()
        })
      }
    },
    LoginSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('Login', this.loginForm).then(res => {
            this.loading = false
            this.$router.push({ name: 'admin'})
          }).catch(err => {
            this.loading = false
            Message({
              message: '用户名或密码错误',
              type: 'error',
              duration: 2000
            })
          })
        } else {
          return false
        }
      })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../assets/css/custom';
$dark_gray:#889aa4;
#header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
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
.adminEntry {
  cursor: pointer;
}
.adminEntry:hover {
  color: $pink;
}
.form-input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
}
</style>
