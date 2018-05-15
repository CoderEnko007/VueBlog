import Vue from 'vue'
import cookie from '../assets/js/cookie'

export default {
  setInfo(state) {
    console.log('setInfo')
    state.userInfo = {
      name: cookie.getCookie('name'),
      token: cookie.getCookie('token')
    }
  }
}
