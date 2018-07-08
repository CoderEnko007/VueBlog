import Vue from 'vue'
import Router from 'vue-router'
import Blog from '../views/Blog'
import Admin from '../admin/Admin'
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
        { path: 'index', name: 'index', component: ()=> import('@/views/BlogList'), meta: { title: '博客列表', need_log: false } },
        { path: 'posts/:id', name: 'posts', component: ()=> import('@/views/Article'), meta: { title: '文章正文', need_log: false } },
        { path: 'search/:keyword', name: 'search', component: ()=> import('@/views/BlogList'), meta: { title: '搜索', need_log: false } },
        { path: 'category/:category', name: 'category', component: ()=> import('@/views/BlogList'), meta: { title: '文章类别', need_log: false } },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: ()=> import('@/admin/Admin'),
      redirect: { name: 'listPage'},
      children: [
        {path: '/admin/listPage', component: ()=> import('@/admin/ListPage'), name: 'listPage', meta: { title: '博客列表', need_log: true }},
        {path: '/admin/editPage/:id', component: ()=> import('@/admin/EditPage'),  name: 'editPage', meta: { title: '编辑文章', need_log: true }},
        {path: '/admin/createPage', component: ()=> import('@/admin/CreatePage'), name: 'createPage', meta: { title: '新建文章', need_log: true }},
        {path: '/admin/category', component: ()=> import('@/admin/Category'), name: 'adminCategory', meta: { title: '文章类别', need_log: true}},
        {path: '/admin/tags', component: ()=> import('@/admin/Tags'), name: 'adminTags', meta: { title: '文章标签', need_log: true}}
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
  ],
  // scrollBehavior(to, from,savedPosition) {
  //   return {
  //     x: 0,
  //     y: 0
  //   }
  // }

})
