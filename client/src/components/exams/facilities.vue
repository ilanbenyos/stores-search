<template>
  <section class= "section">
    <div class = "container flex col center-hor">
        <div class= "main-header" >{{componentName}}</div>
        <div  class= "list-item outline1" v-for="(item,idx) in list">
            <div v-if="idx === 0" class= "header self-al-start outline1 field flex row field-line" >
                <div class="field header name hide1">Name:</div>
                <div class="field width10 hide1">שם</div>
                <div class="field width5 hide1">short</div>
                <div class="field width5 hide1">מקוצר</div>
            </div>
            <div class="field flex row col1 ">
                <div class="field-line flex col1">
                    <div class="field flex col width10">
                            <div class="field header show1 ">Name:</div>
                                <b-form-input size="lg" disabled class="input name" v-model="item.name"></b-form-input>
                    </div>
                    <div class="field flex col width10 ">
                            <div class="field header show1">שם</div>
                                <b-form-input size="lg" disabled class="input nameHeb" v-model="item.nameHeb"></b-form-input>
                    </div>
                    <div class="field flex col width5">
                            <div class="field header show1">short</div>
                                <b-form-input size="lg" disabled class="input " v-model="item.nameShort"></b-form-input>
                    </div>
                    <div class="field flex col width5">
                            <div class="field header show1">מקוצר</div>
                                <b-form-input size="lg" disabled class="input " v-model="item.nameHebShort"></b-form-input>
                    </div>
                    <b-button variant='warning' class="margin-sides1" @click="editRecord(item)">
                        <b-tooltip :delay="tooltipDelay" content="edit page">
                                <i class="material-icons">mode_edit</i>
                        </b-tooltip>
                    </b-button>

                </div>
            </div>
            </div>
    </div>
    <div  class="buttons-pnl margin-top-1 flex row center-ver">
                <b-button variant='primary' @click="addNewLocalRecord(listName)">
                    <b-tooltip :delay="tooltipDelay" content="add new record">
                        <i class="material-icons">add_box</i>
                    </b-tooltip>
                </b-button>
            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="save all">
                <b-button  size="lg" variant='primary' @click="saveAll(list,listName)">save all</b-button>
            </b-tooltip>
            
            <b-button variant='primary' @click="getList(listName,{},$event)">
                <b-tooltip :delay="tooltipDelay" content="refresh list">
                        <i class="material-icons">refresh</i>
                </b-tooltip>
            </b-button>
    </div>
           <!--====================MODAL========================-->
      <transition name="fade">
            <div  v-on:click="closeModal"  v-if="pageEdit" class="modal" >
                <div v-on:click.stop="pageEdit=true" class="inner-modal flex col center-hor ">
                    <a href="javascript:void(0)" class="closebtn" @click.stop="closeModal">&times;</a>
                    <div v-if="item._id" class= "main-header" >Edit {{item.name}}</div>
                    <div v-else          class= "main-header" >New {{itemName}}</div>
                    <div   class="field-line flex col form">
                        <div class="field  col ">
                                <div class="field header">Name:</div>
                                <b-form-input size="lg" @keydown.native="modalIsDirty" class="input" v-model="item.name"></b-form-input>
                        </div>
                        <div class="field  col ">
                                <div class="field header ">שם:</div>
                                <b-form-input size="lg"  @keydown.native="modalIsDirty" class="input" v-model="item.nameHeb"></b-form-input>
                        </div>
                        <div class="field  col ">
                                <div class="field header ">nameShort:</div>
                                <b-form-input size="lg" @keydown.native="modalIsDirty" class="input" v-model="item.nameShort"></b-form-input>
                        </div>
                        <div class="field  col ">
                                <div class="field header ">מקוצר:</div>
                                <b-form-input size="lg" @keydown.native="modalIsDirty" class="input" v-model="item.nameHebShort"></b-form-input>
                        </div>
                    <!--===========BUTTONS PANNEL========-->
                    <div  class="buttons-pnl">
                        <b-button :class="{ btnDisabled: !modalDirty }" :disabled= "!modalDirty" variant='primary'  
                            @click.stop="saveRecord(listName,item,$event)">
                            <b-tooltip  class="margin-sides1" :delay="tooltipDelay" content="backup">
                                    <i  class="material-icons">backup</i>
                            </b-tooltip>
                        </b-button>
                        
                        <b-button variant='danger'  
                                    @click.stop="deleteFromList(listName,item._id,$event)">
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
                </div>
            </div>
                <div class="modal-background "></div>
        </div>
        </transition>

                      <!--====================MODAL2========================-->
      <transition name="fade">
            <div  v-on:click="modal2='false'"  v-if="modal2" class="modal" >
                <div v-on:click.stop="modal2=true" class="inner-modal flex col center-hor ">
                   <!--============HEADER=============-->
                    <a href="javascript:void(0)" class="closebtn" @click.stop="closeModal2">&times;</a>
                    <div class= "main-header" >are you sure you want to delete?</div>
                    <div   class="field-line flex col form">

                    <!--===========BUTTONS PANNEL========-->
                    <div  class="buttons-pnl">
                        <b-button variant='danger'  
                                    @click.stop="deleteFromList2(listName,item._id,$event)">
                                <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="delete">
                                    <i class="material-icons">delete_forever</i>
                                </b-tooltip>
                        </b-button>
                        <b-button variant='warning' @click.stop="closeModal2">
                            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="undo">
                                <i class="material-icons">undo</i>
                            </b-tooltip>
                        </b-button>
                    </div>
                </div>
            </div>
            <div class="modal-background "></div>
        </div>
        </transition>

  </section>
</template>
<script>

import { SENDMSG } from '../../store/store'
import moment from 'moment'


export default {
  name: 'Facilities',
  data() {
    return {
    //   mixins: [mixins],
      componentName:'Facilities list',
      state:this.$store.getters.fetchGetState,
      ponds:this.$store.getters.fetchGetPonds,
      facilities:this.$store.getters.fetchGetFacilities,//
      pageMode:'readOnly',
      editMode:false,
      pageEdit:false,
      tooltipDelay:700,
      fetchList:this.$store.getters.fetchGetFacilities,//need to be changed!!
      list:[],
      listName:'facilities',//need to be changed!!
      item: '',
      itemName: 'facility',
      modalDirty:false,
      modal2:false
    }
  },
  created () {
        this.getList(this.listName,{});
        this.list = this.$store.getters.fetchGetFacilities;
  },
    watch:{
      list1: function(newList){
        this.list = this.$store.getters.fetchGetFacilities;
      },
    },
    computed: {
        list1() {return this.$store.getters.fetchGetFacilities},
    },
  methods: {//
        cloneDeep(obj){
            var myJSON = JSON.stringify(obj);
            return JSON.parse(myJSON)
        },
    modalIsDirty(){
        this.modalDirty = true;
    },
  closeModal(){
            this.pageEdit =false;
            this.modalDirty = false;
  },
      editRecord(item){
            this.pageEdit =!this.pageEdit;
            this.item = this.cloneDeep(item);
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
        this.item = {mode :'edit'};
        this.pageEdit =true;
      },
      getList(listName,criteria){
            console.log('graders.getList', listName)
            const acts =[{ actType: 'getList', list:listName, criteria:{} }];
            this.sendMsg({acts});
      },
    getObjById(objId,arr) {
        var arr1 = this[arr];
        var obj = arr.find(function (obj1) {
            return (objId === obj1._id)
        })
        return obj
    },
      deleteFromList2(list,id,e){
            const acts =[
                            { actType: 'deleteFromList', objId:id, list},
                            { actType: 'getList', list:list, criteria:{} }
                        ]
            this.sendMsg({acts});
            this.closeModal();
            this.modal2 =false;
      },
      closeModal2(){
        this.modal2 =false;
      },
      deleteFromList(list,id,e){
        this.modal2 =true;
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

</style>
