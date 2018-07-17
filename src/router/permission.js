import router from './index'
import store from '../store'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'

const whiteList = ['index', 'posts', 'search', 'category', 'tags', 'HelloWorld', 'list', 'archive', 'about']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (store.getters.roles.length === 0) {
      store.dispatch('GetInfo').then(res => { // 拉取用户信息
        next()
      }).catch((err) => {
        store.dispatch('Logout').then(() => {
          Message.error(err || 'Verification failed, please login again')
          next({ path: '/' })
        })
      })
    } else {
      next()
    }
  } else {
    // if (whiteList.indexOf(to.name) !== -1) {
    if (!to.meta.need_log) {
      next()
    } else {
      Message.error('需要登录才能访问')
      next('/')
    }
  }
})

router.afterEach(() => {
  // doing nothing
})
