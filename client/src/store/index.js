import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import mutations from './mutations'
// import getters from './getters'
// import actions from './actions'



Vue.use(Vuex)

import {userStore} from './store'
// import {contactStore} from './contacts.store'


export default new Vuex.Store({
  state: {},
  modules: {
    // contact: contactStore,
    user: userStore
  },
  // state,
  // mutations,
  // getters,
  // actions,
  // strict: true

})

