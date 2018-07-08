<template>
  <div :class="classObj">
    <div class="sidebar-container">
      <el-menu router mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse"
               background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
        <el-menu-item v-for="(item, index) in items" :key="index" :index="item.to">
          <i :class="item.class"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="main-container">
      <el-menu class="navbar-container" mode="horizontal">
        <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="!isCollapse"></hamburger>
        <span class="title">{{$route.meta.title}}</span>
        <div class="logoutIcon"><span>Hello, {{name}}</span><i class="fas fa-sign-out-alt" @click="logout"></i></div>
      </el-menu>

      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Hamburger from '@/admin/components/Hamburger'
import { mapGetters } from 'vuex'

export default {
  name: 'Admin',
  components: {
    Hamburger,
  },
  data () {
    return {
      items: [
        {class: 'fas fa-home mr-3', name: '首页', to: '/'},
        {class: 'fas fa-list-ul mr-3', name: '文章列表', to:'/admin/listPage'},
        {class: 'fas fa-edit mr-3', name: '新建文章', to:'/admin/createPage'},
        {class: 'fas fa-book mr-3', name: '文章类别', to:'/admin/category'},
        {class: 'fas fa-tags mr-3', name: '文章标签', to:'/admin/tags'},
      ],
      isCollapse: false,
    }
  },
  computed: {
    ...mapGetters([
      'avator',
      'name'
    ]),
    classObj() {
      return {
        adminContainer: true,
        hideSidebar: this.isCollapse
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('Logout').then(() => {
        this.$confirm('确认退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ path: '/' })
        })
      })
    },
    toggleSideBar() {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/custom';

.title {
  color: #555;
  line-height: 50px;
  margin-left: 10px;
  font-size: 24px;
}

.adminContainer {
  height: 100%;
  background-color: white;
}
.sidebar-container {
  transition: width 0.28s;
  width: 180px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  // 解决展开sidebar闪烁的问题
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  a {
    display: inline-block;
    width: 100%;
    overflow: hidden;
  }
  .el-menu {
    border: none;
    height: 100%;
    width: 100%;
  }
}
.main-container {
  height: 100%;
  min-width: 1200px;
  margin-left: 180px;
  transition: margin-left .28s;
  .navbar-container {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    margin-bottom: 0;
    .hamburger-container {
      float: left;
      line-height: 58px;
      height: 50px;
      padding: 0 10px;
      &:focus {
        outline: none;
      }
    }
    .logoutIcon {
      float: right;
      display: inline-block;
      &>i, &>span {
        color: $blue;
        font-size: 1.5em;
        cursor: pointer;
        height: 58px;
        line-height: 58px;
        margin-right: 40px;
      }
      &>span {
        display: inline-block;
        font-size: 1.2em;
        margin-right: 15px;
      }
    }
  }
}
.hideSidebar {
  .sidebar-container {
    width: 56px !important;
  }
  .main-container {
    margin-left: 56px;
  }
}


</style>
