import API from '../../services/api'

const apikeysModule = {
  namespaced: true,
  state: {
    apiKeys: [],
    apiKeyToCreateOrEdit: null,
    waiting: {
      getApiKeys: false,
      createApiKey: false,
      removeApiKey: false,
      updateApiKey: false
    }
  },
  mutations: {
    STORE_WAITING_STATUS (state, payload) {
      state.waiting[payload.type] = payload.status
    },
    STORE_APIKEY (state, apiKey) {
      let existingApiKey = state.apiKeys.find((apiKeyFound) => apiKeyFound.id === apiKey.id)
      if (existingApiKey) {
        existingApiKey = Object.assign(existingApiKey, apiKey)
      } else {
        state.apiKeys.push(apiKey)
      }
    },
    REMOVE_APIKEY (state, apiKey) {
      let apiKeyToDelete = state.apiKeys.find((d) => { return d.id === apiKey.id })
      if (apiKeyToDelete) {
        state.apiKeys.splice(state.apiKeys.indexOf(apiKeyToDelete), 1)
      }
    },
    STORE_APIKEYS (state, apiKeys) {
      state.apiKeys = apiKeys
    },
    STORE_APIKEY_TO_CREATE_OR_EDIT (state, apiKey) {
      state.apiKeyToCreateOrEdit = apiKey
    }
  },
  actions: {
    getApiKeys (context) {
      context.commit('STORE_WAITING_STATUS', {type: 'getApiKeys', status: true})
      return API.getApiKeys().then((apiKeys) => {
        context.commit('STORE_APIKEYS', apiKeys)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'getApiKeys', status: false})
      })
    },
    createApiKey (context, apiKey) {
      context.commit('STORE_WAITING_STATUS', {type: 'createApiKey', status: true})
      return API.createApiKey(apiKey).then((newApiKey) => {
        context.commit('STORE_APIKEY', newApiKey)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'createApiKey', status: false})
      })
    },
    updateApiKey (context, apiKey) {
      context.commit('STORE_WAITING_STATUS', {type: 'updateApiKey', status: true})
      return API.updateApiKey(apiKey).then((updatedApiKey) => {
        context.commit('STORE_APIKEY', updatedApiKey)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'updateApiKey', status: false})
      })
    },
    removeApiKey (context, apiKey) {
      context.commit('STORE_WAITING_STATUS', {type: 'removeApiKey', status: true})
      return API.removeApiKey(apiKey).then(() => {
        context.commit('REMOVE_APIKEY', apiKey)
      }).finally(() => {
        context.commit('STORE_WAITING_STATUS', {type: 'removeApiKey', status: false})
      })
    },
    startCreateOrEditApiKey (context, apiKey) {
      context.commit('STORE_APIKEY_TO_CREATE_OR_EDIT', apiKey)
    },
    stopCreateOrEditApiKey (context) {
      context.commit('STORE_APIKEY_TO_CREATE_OR_EDIT', null)
    }
  },
  getters: {
    apiKeys: (state) => state.apiKeys,
    waiting: (state) => state.waiting,
    apiKeyToCreateOrEdit: (state) => state.apiKeyToCreateOrEdit
  }
}

export default apikeysModule
