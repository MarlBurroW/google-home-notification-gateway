const snackbarModule = {
  namespaced: true,
  state: {
    message: null
  },
  mutations: {
    STORE_MESSAGE (state, message) {
      state.message = message
    }
  },
  actions: {
    showMessage (context, message) {
      context.commit('STORE_MESSAGE', message)
    },
    removeMessage (context, message) {
      context.commit('STORE_MESSAGE', null)
    }
  },
  getters: {
    message: (state) => state.message
  }
}

export default snackbarModule
