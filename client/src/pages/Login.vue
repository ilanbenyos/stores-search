<template>
  <transition name="fade">
    <div>
     =={{msg}}==
      <button class="button" @click="initMsg">initMsg</button>
      <button class="button" @click="getMsgFromStore">getMsgFromStore</button>
      <button class="button" @click="getMsgFromServer($event)">getMsgFromServer</button>
        <div>
            <button class="button" @click="getList($event,'users')">get users</button>
                last user:<div class="users" >users.length:{{users.length}}</div>
            <button class="button" @click="getList($event,'facilities')">get facilities</button>
                facilities:<div class="users" >facilities.length:{{facilities.length}}</div>
            <button class="button" @click="getList($event,'ponds')">get ponds</button>
            <button class="button" @click="getList($event,'ponds',{fac:{$gt:'1'}})">get ponds from fac 1</button>
                ponds:<div class="users" >ponds.length:{{ponds.length}}</div>
          <div>
              <div  v-for="(user1,idx) in users" v-if= "idx<7"><div  >{{idx}}:{{user1.userName}}/{{user1.password}}</div>
                  <button class="button" @click="setUser($event,user1)">set user</button>
              </div>
              <div  v-for="(pond,idx) in ponds" ><div v-if= "idx<7" >id:{{pond.id}}/name{{pond.name}}</div></div>
          </div>
        </div>

        curr user:<div class="user" >{{user}}</div>
        <div>
            userName:<input v-model="tempUser.userName" class="input" placeholder="Choose username" ></input>
            pass:<input v-model="tempUser.password" class="input" placeholder="Choose password" ></input>
            txt:<input v-model="tempUser.txt" class="input" placeholder="free txt" ></input>
            <div>
              <button class="button" @click="submit">submit</button>
              <button class="button" @click="updateUser">updateUser</button>
              <button class="button" @click="deleteFromList($event,'users',user._id)">deleteUser</button>
            </div>
        </div>
        <div>
        </div>
    </div>
  </transition>

</template>

<script>
import { LOG_IN } from '../store/store'
import { SENDMSG } from '../store/store'

export default {
  data() {
    return {
      msg:'login',
      users:[],
      user: {},
      facilities:[],
      ponds:[],
      tempUser:{
                login: '',
                password: '',
                txt:''
                }
      }
  },
    created() {
    this.users = this.$store.getters.fetchGetUsers;

    var currUserInit1 = this.$store.getters.fetchGetUser;
    var currUserInit = this.clone1Deep(currUserInit1)
    console.log('Edit - created - currUserInit:', currUserInit)
    if (currUserInit) this.tempUser = currUserInit;
  },

  mounted(){
      this.msg = this.$store.getters.fetchGetMsg;
  },
  watch:{
      msg1: function(newMsg){
        this.msg = this.$store.getters.fetchGetMsg;
      },
      user1: function(newUser){
        this.user = this.$store.getters.fetchGetUser;
      },
      users1: function(newUsers){
        this.users = this.$store.getters.fetchGetUsers;
      },
      facilities1: function(newFacilities){
        this.facilities = this.$store.getters.fetchGetFacilities;
      },
      ponds1: function(newPonds){
        this.ponds = this.$store.getters.fetchGetPonds;
      },

  },
    computed: {
    msg1() {return this.$store.getters.fetchGetMsg;},
    user1() {return this.$store.getters.fetchGetUser;},
    users1() {return this.$store.getters.fetchGetUsers;},
    ponds1() {return this.$store.getters.fetchGetPonds;},
    facilities1() {return this.$store.getters.fetchGetFacilities;},
},
  methods: {//
      setUser(e,user){
          const act = { actType: 'setUser', user};
          const params = { event:e,askFrom:'store'}
          this.sendMsg({ act,params})
      },
    clone1Deep(obj){
      var myJSON = JSON.stringify(obj);
      return JSON.parse(myJSON)
    },
      initMsg(){
          this.msg = "initMsg";
          // this.$router.push('Browse');
      },
      getMsgFromStore(){
          this.msg = this.$store.getters.fetchGetMsg;
          console.log('getMsgFromStore')
      },
      deleteFromList(e,list,id){
          const act = { actType: 'deleteFromList', user:id,list};
          const params = { event:e,askFrom:'server'}
          this.sendMsg({ act,params})
      },
      getMsgFromServer(e){
          const act = { actType: 'getMsgFromServer', txt:this.msg};
          const params = { event:e,askFrom:'server'}
          this.sendMsg({ act,params})
      },
      // getUsers(e){
      //     const act = { actType: 'getList', list:'users'};
      //     const params = { event:e,askFrom:'server'}
      //     this.sendMsg({ act,params})
      // },//
      getList(e,listName,criteria){
          const act = { actType: 'getList', list:listName,criteria};
          const params = { event:e,askFrom:'server'}
          this.sendMsg({ act,params})
      },//

      submit(e){
        const act = { actType: 'addToList', data: this.tempUser, collection: 'users' }
        const params = { event:e,askFrom:'server'}
          this.sendMsg({ act,params})
         this.tempUser = {login: '',password: '',txt:''}
      },
      updateUser(e){
        this.tempUser._id = this.user._id;
        const act = { actType: 'updateInList', data: this.tempUser }
        const params = { event:e,askFrom:'server'}
          this.sendMsg({ act,params})
         this.tempUser = {login: '',password: '',txt:''}
      },
      sendMsg(msg){
          this.$store.dispatch({ type: SENDMSG, msg })
      },
      cLog(msg){
        //   this.$store.dispatch({ type: SENDMSG, msg })
      },


  }
}
  
</script>

<style lang="scss" scoped>



</style>
