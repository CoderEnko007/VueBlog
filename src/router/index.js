import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../views/Blog'
import BlogList from '../components/BlogList'
import Article from '../components/Article'
import Admin from '../admin/Admin'
import EditPage from '../admin/EditPage'
import ListPage from '../admin/ListPage'
import SearchPage from '../admin/SearchPage'
import HelloWorld from '../components/HelloWorld'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'blog',
      component: Blog,
      redirect: { name: 'index'},
      children: [
        {
          path: 'index/',
          name: 'index',
          component: BlogList,
          meta: {
            title: '博客列表',
            need_log: false
          }
        },
        {
          path: 'posts/:id',
          name: 'posts',
          component: Article,
          meta: {
            title: '文章正文',
            need_log: false
          }
        },
        {
          path: 'search/:keyword',
          name: 'search',
          component: BlogList,
          meta: {
            title: '搜索',
            need_log: false
          }
        },
        {
          path: 'category/:category',
          name: 'category',
          component: BlogList,
          meta: {
            title: '文章类别',
            need_log: false
          }
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      children: [
        {path: '/admin/editPage', component: EditPage, name: 'editPage'},
        {path: '/admin/listPage', component: ListPage, name: 'listPage'},
        {path: '/admin/searchPage', component: SearchPage, name: 'searchPage'},
      ],
      meta: {
        title: '博客后台',
        need_log: true
      }
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]
})
