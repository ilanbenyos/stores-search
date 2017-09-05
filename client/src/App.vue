<template>
  <div id="app">
    <MainNav class="navbar" />
    <router-view></router-view>
  
  </div>
</template>
<script>



import MainNav from '@/components/MainNav';
import { SENDMSG } from './store/store';

export default {
  name: 'app',
  data() {
    return {
      msg:'App.vue',
      listsToInit:['graders','fishes','facilities','ponds','branches', 'shopes']
    }
  },
    created() {
      this.getLists()
    },
    methods: {
      sendMsg(msg){
          this.$store.dispatch({ type: SENDMSG, msg })
      },
      getLists(){
        const acts = this.listsToInit.map(function (listName) {
           return { actType: 'getList', list:listName, criteria:{} } 
          });
          this.sendMsg({acts});
      },

    },
  components: {
    MainNav,
  }
}
</script>


<style lang="scss">


@import url('https://fonts.googleapis.com/css?family=Kurale');
#app {
  // display: flex;
  // flex-direction: column;  
  font-family: 'Kurale', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #652456;
  background: white;
  // max-width: 768px;
  height: 100%;
  ;
  margin: auto;
}

.navbar {
  border-bottom: 1px solid lightgrey;
  width: 100%;
}



body {
  background: white; 
//   background: linear-gradient(to bottom, #eb5757, #e1b496); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  margin: 0;
  height:100%;
  overflow-y: hidden;
  a {
    text-decoration: none!important;
  }
}
.section{
    height: 93%;
    width: 100%;
    // overflow: hidden;
}
.container{
    border-bottom:1px solid gray;
    overflow-y: hidden;
    /*height: calc(100vh - 10em);*/
   /*background-color: yellow;*/
    /*border:1px solid green;*/
    width: calc(100% + 25px);
    height: calc(100% - 200px);
    overflow-y: scroll;
    padding-right: 27px;
    padding:10px;

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
.width90{
    width:90%;
}
.row{
  flex-direction: row;
}
.col{
  flex-direction: column;
}
.field{
    // margin:.3em;
    font-size:1em;
}
.field-line{
    /*flex-wrap: wrap;*/
    max-width:100%;
    margin-top: 1em;
    margin-bottom: 1em;
}
.form{
    /*padding:1em;*/
}
.list-item{
    width:100%;
    margin-bottom:1em;
            padding:1em;
        padding-right:1.5em;
        padding-left:1.5em;

}
.button{
    height:80%;
    vertical-align: middle;
}
.buttons-pnl{
    margin-top:1em;
    margin-bottom:1em;
}
input{
    width:100%;
}
.width5{
    width: 5em;
}
.width7{
    width: 7em;
}
.width3{
    width: 3em;
}
.name,.width10{
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
select{
  font-size:1.5em;
}
.header{
    color:black;
    font-size:1.3em;
    font-weight: bold;
    padding-right:0.5em;
    padding-left:0.5em;
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
.btnDisabled{
    opacity:0.5;
    cursor: not-allowed;
}
.inner-modal .closebtn {
    /*position: relative;*/
    align-self: flex-end;
    margin-top: -20px;
    top: 0;
    /*right: 25px;*/
    font-size: 36px;
    margin-right: -4px;
}
  .item{
      font-size: 1.5em;
    }
.card{
    width:80vw;
}
.margin-top-sm{
    margin-top:0.5em;
}
.font-size-md{
    font-size:2em;
}
.width80{
     width:80%;
}

@media screen and (max-width: 700px) {
    .width100sm{
        width:100%;
    }
    .container{
        // width:calc(100% + 17px);
        width:100%;
    }
    .align-center-1{
        align-items: center;
    }
    .field{
        /*background-color: lightgoldenrodyellow;*/
        // width:98%;
    }
    .field-line{
        display: inline;
    }
    .input{
        width:98%;
    }
    .show1{
            display:block;
        }
    .text-align-right-1{
        text-align: right;
    }
    .hide1{
            display:none;
    }
    .list-item{
        padding:1em;
        padding-right:1.5em;
        padding-left:1.5em;
    }
    .size-md-1{
        font-size: 2em;
    }
    .col1{
            flex-direction: column;
    }
    .space-around1{
        justify-content: space-around;
    }
    .float-left1{
     float : left;  
    }
    .display-none-1{
        display:none;
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
