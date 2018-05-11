import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../views/Blog'
import BlogList from '../components/BlogList'
import HelloWorld from '../components/HelloWorld'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Blog',
      component: Blog,
      children: [
        {
          path: 'list/',
          name: 'list',
          component: BlogList,
          meta: {
            title: '博客列表',
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
        }
      ]
    },
    {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
