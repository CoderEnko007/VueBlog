<template>
  <div class="admin">
    <div class="header bg-dark">
      <h2 class="d-inline"><router-link to="/" class="title ml-5"><i class="fas fa-home mr-2">&nbsp</i>博客后台</router-link></h2>
      <div class="logoutIcon"><i class="fas fa-sign-out-alt" @click="logout"></i></div>
    </div>
    <div class="row view-body">
      <b-nav vertical class="pl-3 bg-dark w-15">
        <b-nav-item v-for="item in items" :key="item.key" :to="item.to">
          <i :class="item.class"></i>
          {{item.name}}
        </b-nav-item>
      </b-nav>
      <div class="col w-75">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import cookie from '../assets/js/cookie';

  export default {
    name: 'Admin',
    data () {
      return {
        items: [
          {key: 1, class: 'fa fa-list-ul fa-fw mr-2', name: '文章列表', to:'/admin/listPage'},
          {key: 2, class: 'fa fa-pencil-square-o fa-fw mr-2', name: '新建文章', to:'/admin/newPage'},
        ]
      }
    },
    methods: {
      logout() {
        cookie.delCookie('token');
        cookie.delCookie('name');
        this.$store.dispatch('setInfo');
        this.$router.push({ name: 'blog' });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '../../scss/custom';

.header>h2 {
  height: 80px;
  line-height: 80px;
}
.view-body {
  width: 100%;
  position: absolute;
  top: 80px;
  bottom: 0;
  left: 0;
}
.title {
  color: $blue;
}
.title:hover {
  color: $blue;
  text-shadow: 0 0 24px;
  text-decoration: none;
}
.nav-link {
  height: 56px;
  line-height: 56px;
  color: white;
  padding: 0 20px;
  font-size: 15px;
  transition:all 0.5s;
}
.nav-link:hover {
  color: $blue;
  background-color: rgb(41, 43, 47);
}
a.nav-link>i {
  color: #AAA;
}
.active {
  color: $blue;
  text-shadow: 0 0 24px;
}
.logoutIcon {
  float: right;
}
.logoutIcon>i {
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  height: 80px;
  line-height: 80px;
  margin-right: 40px;
}
</style>
