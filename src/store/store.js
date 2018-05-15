import Vue from 'vue'
import Vuex from 'vuex'

import cookie from '../assets/js/cookie'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);

const userInfo = {
  name: cookie.getCookie('name')||'',
  token: cookie.getCookie('token')||'',
};

const state = {
  userInfo,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
