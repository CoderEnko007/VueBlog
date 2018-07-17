import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/views/Blog'

import BlogList from '@/views/BlogList/index'
import list from '@/views/BlogList/list'

import HelloWorld from '@/components/HelloWorld'

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
          path: '',
          name: 'index',
          // component: ()=> import('@/views/BlogList/index'),
          component: BlogList,
          redirect: { name: 'list'},
          children: [
            { path: '', name: 'list', component: list, meta: { title: '文章列表', need_log: false} },
            { path: 'archive', name: 'archive', component: ()=> import('@/components/HelloWorld'), meta: { title: '归档', need_log: false} },
            { path: 'about', name: 'about', component: ()=> import('@/components/HelloWorld'), meta: { title: '关于', need_log: false} },

            { path: 'category/:category', name: 'category', component: list, meta: { title: '文章类别', need_log: false } },
            { path: 'tags/:tag', name: 'tags', component: ()=> import('@/views/BlogList/list'), meta: { title: '文章标签', need_log: false } },
            { path: 'search/:keyword', name: 'search', component: ()=> import('@/views/BlogList/list'), meta: { title: '搜索', need_log: false } },
          ]
        },

        {
          path: 'posts/:id',
          name: 'posts',
          component: ()=> import('@/views/Article'),
          meta: { title: '文章正文', need_log: false }
        },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: ()=> import('@/admin/Admin'),
      redirect: { name: 'listPage'},
      children: [
        {path: 'admin/listPage', component: ()=> import('@/admin/ListPage'), name: 'listPage', meta: { title: '博客列表', need_log: true }},
        {path: 'admin/editPage/:id', component: ()=> import('@/admin/EditPage'),  name: 'editPage', meta: { title: '编辑文章', need_log: true }},
        {path: 'admin/createPage', component: ()=> import('@/admin/CreatePage'), name: 'createPage', meta: { title: '新建文章', need_log: true }},
        {path: 'admin/category', component: ()=> import('@/admin/Category'), name: 'adminCategory', meta: { title: '文章类别', need_log: true}},
        {path: 'admin/tags', component: ()=> import('@/admin/Tags'), name: 'adminTags', meta: { title: '文章标签', need_log: true}}
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
})
