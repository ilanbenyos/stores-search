<template>
  <section class= "section">
      <!--{{mixins.getIdxById1('rrr')}}-->
    <div class = "container flex col center-hor">
=={{list.length}}==
        <div class= "main-header" >{{componentName}}</div>
        <div  class= "list-item outline1" v-for="(item,idx) in list">
            <div v-if="idx === 0" class= "header self-al-start outline1 field flex row field-line" >
                <div class="field header name hide1">Name:</div>
                <div class="field nameHeb hide1">mm</div>
            </div>
            <div class="field flex row col1 ">
                <div class="field-line flex col1 eeeee ">
                    <div class="field flex col ">
                            <div class="field header show1">Name:</div>
                                <b-form-input size="lg" disabled class="input name" v-model="item.name"></b-form-input>
                    </div>
                    <div class="field flex col ">
                            <div class="field header show1">mm</div>
                                <b-form-input size="lg" disabled class="input nameHeb" v-model="item.mm"></b-form-input>
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
                   <!--=========================-->
                    <div class= "main-header" >New Grader</div>
                    <div   class="field-line flex col form">
                        <div class="field  col ">
                                <div class="field header">Name:</div>
                                <b-form-input size="lg" class="input" v-model="item.name"></b-form-input>
                        </div>
                        <div class="field  col ">
                                <div class="field header ">mm:</div>
                                <b-form-input size="lg" class="input" v-model="item.mm"></b-form-input>
                        </div>
                    <!--===========BUTTONS PANNEL========-->
                    <div  class="buttons-pnl">
                        <b-button variant='primary'  
                            @click.stop="saveRecord(listName,item,$event)">
                            <b-tooltip class="margin-sides1" :delay="tooltipDelay" content="backup">
                                    <i  class="material-icons">backup</i>
                            </b-tooltip>
                        </b-button>
                        
                        <b-button variant='danger'  
                                    @click.stop="deleteFromList('listName',item._id,$event)">
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
  name: 'Graders',
  data() {
    return {
    //   mixins: [mixins],
      componentName:'Graders list',
      state:this.$store.getters.fetchGetState,
      ponds:this.$store.getters.fetchGetPonds,
      facilities:this.$store.getters.fetchGetFacilities,//
      pageMode:'readOnly',
      editMode:false,
      pageEdit:false,
      tooltipDelay:700,
      fetchList:this.$store.getters.fetchGetGraders,//need to be changed!!
      list:[],
      listName:'graders',//need to be changed!!
      item: '',
    }
  },
  created () {
        this.getList(this.listName,{});
        console.log('graders.created.getList',this.listName)
        this.list = this.fetchList;
  },
    watch:{
      list1: function(newList){
        this.list = this.fetchList;
      },
    },
    computed: {
        list1() {return this.fetchList},
    },
  methods: {//
    //   getObjById1:mixins.getObjById1,
  closeModal(){
            this.pageEdit =false;
  },
      editRecord(item){
            this.pageEdit =!this.pageEdit;
            this.item = item;
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
.section{
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.container{
    width: calc(100% + 25px);
    height: calc(100% - 170px);
    overflow-y: scroll;
    padding-right: 27px;
    padding:10px;
    /*height: calc(100vh - 10em);*/
   /*background-color: yellow;*/
    /*border:1px solid green;*/
}
.modal{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.inner-modal{
    border-radius: 15px;
    opacity: 1;
    /*height:30%;*/
    background-color: white;
    z-index: 5;
    padding:2em;
}
.modal-background{
    position:absolute;
    width:100%;
    height:100%;
    background-color: gray;
    opacity: .5;
}
.main-header{
    font-size: 2.5em;
    color: #6d0c62;
    font-weight:900;
}
.flex{
  display: flex;
}
.row{
  flex-direction: row;
}
.col{
  flex-direction: column;
}
.field{
    margin:.3em;
    font-size:1em;
}
.field-line{
    /*flex-wrap: wrap;*/
    max-width:100%;
}
.form{
    /*padding:1em;*/
}
.list-item{
    width:100%;
    margin-bottom:1em;
}
.button{
    height:80%;
    vertical-align: middle;
}
.buttons-pnl{
    margin:1em;
    
}
input{
    width:100%;
}
.name,.nameHeb{
    width: 10em;
}
.id{
    width: 10em;
}
.nameShort{
    width: 8em;
}
.outline1{
    border:1px solid gray;
}
.center-hor{
    align-items: center;
}
.center-ver{
    justify-content:center;
}

.margin-top-1{
    margin-top:10px;
}
.margin-sides1{
    margin-right:10px;
    margin-left:10px;
}
.self-al-start{
    align-self: flex-start;
}
.wrap{
    flex-wrap: wrap;
}
.header{
    color:black;
    font-weight: bold;
}
.input {
    font-size:1em;
}
.show1{
        display:none;
}
.hide1{
        display:block;
}
.opacity8{
    opacity:.5;
}
.btn{
    transition: 0.5s all;
}
@media screen and (max-width: 650px) {
    .field{
        /*background-color: lightgoldenrodyellow;*/
        width:98%;
    }
    .input{
        width:98%;
    }
    .show1{
            display:block;
        }
    .hide1{
            display:none;
    }
        .col1{
            flex-direction: column;
        }
    
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s
}
.fade-enter, .fade-leave-to {
  opacity: 0
}
.space-around{
    justify-content:space-around;
}
*{
    /*border:1px solid green;*/
}
</style>
