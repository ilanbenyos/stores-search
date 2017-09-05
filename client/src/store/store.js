
export const SND_MSG = 'SND_MSG';
export const LOG_IN = 'LOG_IN';
export const SENDMSG = 'SENDMSG';//
export const SENDLOCALMSG = 'SENDLOCALMSG';//

import service from '../services/service'


const state = {
  loginStatus: true,
  // user: {id:111,password:111,txt:'111'},
  user: {},
  users:[],
  storeMsg:'first msg from store',
  dog:{},
  acts:[],
  ponds:[],
  facilities:[],
  fishes:[],
  batches:[],
  graders:[],
  fish:'',
  markers:[],
  branches:[],
  shops:[],

};

const getters = {
  fetchGetMsg(state) {//
    return state.storeMsg;
  },
  fetchGetShops(state) {//
    return state.shops;
  },
  fetchGetBranches(state) {
    return state.branches;
  },
  fetchGetMarkers(state) {
    return state.stores;
  },
  fetchGetUser(state) {
    return state.user;
  },
  fetchGetUsers(state) {
    return state.users;
  },
  fetchGetActs(state) {
    return state.acts;
  },
  fetchGetPonds(state) {
    return state.ponds;
  },
  fetchGetGraders(state) {
    return state.graders;
  },
  fetchGetFacilities(state) {
    return state.facilities;
  },
  fetchGetBatchs(state) {
    return state.batchs;
  },
  fetchGetFishes(state) {
    return state.fishes;
  },
  fetchGetCurrFish(state) {
    return state.currFish;
  },
  fetchGetState(state) {
    return state;
  }

}
function getObjById(objId,arr) {
      var arr1 = this[arr];
      var obj = arr.find(function (obj1) {
          return (objId === obj1._id)
      })
      return obj
}
function getIdxById(objId,arr) {
      index = state[arr].findIndex(item => item._id==objId);
      return index
}

const mutations = {

  [SENDMSG](state, payload) {
    var acts = payload.res
    for (var i = 0; i < acts.length; i++) {
      var act = acts[i];
      var actType = act.actType;
      switch (actType) {
        case 'setUser'://    
          state.user = act.res;
        break;
        case 'addToList'://    
          var list = act.list
          // state[list] = act.res;
          state[list].splice(0,state[list].length, act.res);
        
        break;
        case 'getList'://    
          var list = act.list
          state[list] = act.res;
        break;
        case 'updateInList':// 
          var list = act.list
          var idx = state[list].findIndex(item => item._id==act.id);
          state[list][idx] = act.res;
        break;
      }
    }

  },
  [LOG_IN](state, { user }) {
    // console.log('storec.mutation.LOG_IN: status',state.loginStatus)
    // console.log('store.mutation.LOG_IN: ', user)
    // console.log('TBD - store.mutation.LOG_IN')
    if (user) {
      state.currUser = user;
      var myJSON = JSON.stringify(user);
      localStorage.currUser = myJSON;

      state.loginStatus = true;
      //  console.log('store.mutation.LOG_IN: login approved',state.loginStatus)
    }
    else {
      state.loginStatus = false;
      // console.log('store.mutation.LOG_IN: login incorrect',state.loginStatus )
    }
    // TBD write cookie of loged in
    //console.log('store.currUser: ', state.currUser)
  },
}

const actions = {//
  [SENDMSG](context, payload) {
        var prm = service.sendMsg(payload);
        return prm.then(res => {
          payload.res = res;
          context.commit(payload);
      });
  },
  [SENDLOCALMSG](context, payload) {
    //go directly to mutations
          context.commit(payload);
  },


}

export const userStore = {
  state,
  mutations,
  getters,
  actions
}


