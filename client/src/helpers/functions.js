

// export default {
  export const sortlistBy2Keys= function(list,key1,key2){
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

export const cloneDeep= function (obj){
            var myJSON = JSON.stringify(obj);
            return JSON.parse(myJSON)
      }
export const  getObjById= function(objId,arr) {
        var obj = arr.find(function (obj1) {
            return (objId === obj1._id)
        })
        return obj
    }

