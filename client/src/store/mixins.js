

const state = {
};


export default {
  methods: {
    getObjById1: function (ttt) {
        console.log('mixins:',ttt)
      return ttt
    },
    getObjById2: function (objId,arr) {
      var arr1 = this[arr];
      var obj = arr.find(function (obj1) {
          return (objId === obj1._id)
      })
      return obj
    },
    getIdxById1: function (objId,arr) {
      index = state[arr].findIndex(item => item._id==objId);
      return index
    }



  }
}

