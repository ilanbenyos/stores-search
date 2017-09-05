<template>
  <section class= "section">
      <!--{{mixins.getIdxById1('rrr')}}-->
    <div class = "container flex col center-hor">

        <div class= "main-header" >{{componentName}}</div>
        <div  class= "list-item outline1" v-for="(fish,idx) in fishes">
            <div v-if="idx === 0" class= "header self-al-start outline1 field flex row field-line" >
                <div class="field header name hide1">Name:</div>
                <div class="field nameHeb hide1">Heb</div>
                <div class="field nameShort hide1">Short</div>
            </div>
            <div class="field flex row col1 ">
                <div class="field-line flex col1 eeeee ">
                    <div class="field flex col ">
                            <div class="field header show1">Name:</div>
                            <b-form-input size="lg" disabled class="input name" v-model="fish.name"></b-form-input></div>
                    <div class="field flex col ">
                            <div class="field header show1">שם עברי:</div>
                            <b-form-input size="lg" disabled class="input nameHeb" v-model="fish.nameHeb"></b-form-input></div>
                    <div class="field flex col ">
                            <div class="field header show1">short:</div>
                            <b-form-input size="lg" disabled class="input nameShort" v-model="fish.nameShort"></b-form-input></div>
                    <b-button variant='warning' class="margin-sides1" @click="editRecord(fish)">
                        <b-tooltip :delay="tooltipDelay" content="edit page">
                                <i class="material-icons">mode_edit</i>
                        </b-tooltip>
                    </b-button>
                    
                </div>
            </div>
            </div>
    </div>
    <div  class="buttons-pnl margin-top-1 flex row center-ver">
                <b-button variant='primary' @click="addNewLocalRecord('fishes')">
                    <b-tooltip :delay="tooltipDelay" content="add new record">
                        <i class="material-icons">add_box</i>
                    </b-tooltip>
                </b-button>
            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="save all">
                <b-button  size="lg" variant='primary' @click="saveAll(fishes,'fishes')">save all</b-button>
            </b-tooltip>
            
            <b-button variant='primary' @click="getList('fishes',{},$event)">
                <b-tooltip :delay="tooltipDelay" content="refresh list">
                        <i class="material-icons">refresh</i>
                </b-tooltip>
            </b-button>
    </div>
           <!--====================MODAL========================-->
      <transition name="fade">
            <div  v-on:click="closeModal"  v-if="pageEdit" class="modal" >
                <div v-on:click.stop="pageEdit=true" class="inner-modal flex col center-hor ">
                   <!--=========================-->
                    <div   class="field-line flex col form">
                        <div class="field  col ">
                                <div class="field header">Name:</div>
                                <b-form-input size="lg" class="input" v-model="fish.name"></b-form-input></div>
                        <div class="field  col ">
                                <div class="field header ">שם עברי:</div>
                                <b-form-input size="lg" class="input" v-model="fish.nameHeb"></b-form-input></div>
                        <div class="field  col ">
                                <div class="field header">short:</div>
                                <b-form-input size="lg" class="input" v-model="fish.nameShort"></b-form-input></div>
                    <!--===========BUTTONS PANNEL========-->
                    <div  class="buttons-pnl">
                        <b-button variant='primary'  
                            @click.stop="saveRecord('fishes',fish,$event)">
                            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="backup">
                                    <i  class="material-icons">backup</i>
                            </b-tooltip>
                        </b-button>
                        
                        <b-button variant='danger'  
                                    @click.stop="deleteFromList('fishes',fish._id,$event)">
                                <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="delete">
                                    <i class="material-icons">delete_forever</i>
                                </b-tooltip>
                        </b-button>
                        
                        <b-button variant='warning' @click.stop="closeModal">
                            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="undo">
                                <i class="material-icons">undo</i>
                            </b-tooltip>
                        </b-button>
                </div>
                    <!--===================-->
                </div>
            </div>
                <div class="modal-background "></div>
        </div>
        </transition>
           <!--================================================-->
  </section>
</template>
<script>

import { SENDMSG } from '../../store/store'
import moment from 'moment'


export default {
  name: 'FishesList',
  data() {
    return {
    //   mixins: [mixins],
      arr:[{id:1,name:'ilan'},{id:2,name:'noam'}],
      componentName:'Fishes List',
      state:this.$store.getters.fetchGetState,
      ponds:this.$store.getters.fetchGetPonds,
      facilities:this.$store.getters.fetchGetFacilities,//fetchGetCurrFish
      fishes:this.$store.getters.fetchGetFishes,
      currFish:{},
      pageMode:'readOnly',
      editMode:false,
      pageEdit:false,
      tooltipDelay:700,
      fish: ''
    }
  },
  created () {
        this.getList('fishes',{})
  },
    watch:{
      fishes1: function(newFishes){
        this.fishes = this.$store.getters.fetchGetFishes;
      },
    },
    computed: {
        fishes1() {return this.$store.getters.fetchGetFishes;},
    },
  methods: {//
    //   getObjById1:mixins.getObjById1,
  closeModal(){
            this.pageEdit =false;
  },
      editRecord(fish){
            this.pageEdit =!this.pageEdit;
            this.fish = fish;
      },
        toggleField(e,bul){
            var parent = e.path[5];
            var inputNodes = parent.getElementsByTagName('input');
            this.toggleDisable(inputNodes,bul)
        },
      saveAll(list,listName){
        for (var i = 0; i < list.length; i++) {
            list[i].mode = 'saved';
            const acts =[
                    { actType: 'updateInList', newObj: list[i], list:listName,askFrom:'server' },
                        ]
            this.sendMsg( {acts});
        }                   
      },
      saveRecord(list,newObj,e){
            newObj.mode = 'saved';
            const acts =[]
            if(newObj._id){
                acts.push({ actType: 'updateInList', newObj, list,askFrom:'server' })
            }else{
                    acts.push({ actType: 'addToList', newObj, list,askFrom:'server' })
            }
                acts.push({ actType: 'getList', list, criteria:{},askFrom:'server' })
                this.sendMsg( {acts});
                this. closeModal()
      },
      addNewLocalRecord(arr){
        this.fish = {mode :'edit'};
        this.pageEdit =true;
      },
      getList(list,criteria){
            const acts =[{ actType: 'getList', list:list, criteria:{} }];
            this.sendMsg({acts});
      },
    getObjById(objId,arr) {
        var arr1 = this[arr];
        var obj = arr.find(function (obj1) {
            return (objId === obj1._id)
        })
        return obj
    },
      deleteFromList(list,id,e){
            const acts =[
                            { actType: 'deleteFromList', objId:id, list},
                            { actType: 'getList', list:list, criteria:{} }
                        ]
            this.sendMsg({acts});
            this.closeModal();
      },
      toggleDisable(inputNodes,bul){
            for (var i = 0; i < inputNodes.length; i++) {
                inputNodes[i].disabled = bul;
            }
      },
    sendMsg(msg){
          this.$store.dispatch({ type: SENDMSG, msg })
    },
    sendLocalMsg(msg){//msgs to the store
          this.$store.dispatch({ type: SENDLOCALMSG, msg })
    },
  },
}
</script>
<style scoped>

*{
    /*border:1px solid green;*/
}
</style>
