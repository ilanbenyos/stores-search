

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
  
 const sortlistBy2Keys= function(list,key1,key2){
            var list1 = cloneDeep(list);
            list1.sort(function (a, b) {
                if (a[key1] < b[key1]){
                    return -1;
                }else if (a[key1] > b[key1]){
                    return 1;
                }else{
                    if (a[key2] < b[key2]){
                        return -1;
                    }else if (a[key2] > b[key2]){
                        return 1;
                    }
                    return 0;
                }
            });
            return list1
     }

 const cloneDeep= function (obj){
            var myJSON = JSON.stringify(obj);
            return JSON.parse(myJSON)
      }
 const  getObjById= function(objId,arr) {
        var obj = arr.find(function (obj1) {
            return (objId === obj1._id)
        })
        return obj
    }
 const  getIdxById= function(objId,arr) {
        var idx = arr.findIndex(function (obj1) {
            return (objId === obj1._id)
        })
        return idx
    }
const sortList= function(list){
    var newList = list.sort((a, b) =>{
     return a.dist-b.dist
    });
    return newList;
}

  //==============================================
export default {
    generateId,
    cloneDeep,
    getObjById,
    getIdxById,
    sortlistBy2Keys,
      }