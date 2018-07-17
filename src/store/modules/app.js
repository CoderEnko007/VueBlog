const defaultList = {
  page: 1,
  search: undefined,
  category: undefined,
  tags: undefined,
  ordering: '-create_time'
}

const app = {
  state: {
    listQuery: Object.assign({}, defaultList),
  },
  mutations: {
    RESET_QUERY_LIST: (state) => {
      state.listQuery = Object.assign({}, defaultList)
    },
    SET_PAGE: (state, page) => {
      state.listQuery.page = page
    },
    SET_SEARCH_KEY: (state, word) => {
      state.listQuery = Object.assign({}, defaultList)
      state.listQuery.search = word
    },
    SET_CATEGORY: (state, category_id) => {
      state.listQuery = Object.assign({}, defaultList)
      state.listQuery.category = category_id
    },
    SET_TAG: (state, tag_id) => {
      state.listQuery = Object.assign({}, defaultList)
      state.listQuery.tags = tag_id
    },
    SET_ORDERING: (state, ordering) => {
      state.listQuery = Object.assign({}, defaultList)
      state.listQuery.ordering = ordering
    },
    SET_LIST_QUERY: (state, query) => {
      state.listQuery = Object.assign({}, query)
    }
  },
  actions: {
    ResetQueryList({commit}) {
      commit('RESET_QUERY_LIST')
    },
    SetQueryPage({commit}, page) {
      commit('SET_PAGE', page)
    },
    SetSearchWord({commit}, word) {
      commit('SET_SEARCH_KEY', word)
    },
    SetQueryCategory({commit}, id) {
      commit('SET_CATEGORY', id)
    },
    SetQueryTag({commit}, id) {
      commit('SET_TAG', id)
    },
    SetQueryOrder({commit}, ordering) {
      commit('SET_ORDERING', ordering)
    },
    SetListQuery({commit}, query) {
      commit('SET_LIST_QUERY', query)
    }
  }
}

export default app
