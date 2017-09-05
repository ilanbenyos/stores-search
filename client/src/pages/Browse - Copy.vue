<template>
  <transition name="fade">
    <!--<div v-if="user">-->
    <div v-if="currUser" class="main">
    <!--<div  class="main">-->
      <div id="browse-div" class="browse flex-center" ref="playground">
        <!--v-if="drageVals.showUser && nextUser"-->
        <!--{{nextUser}}-->
        <!--//==================================================-->
        <div class="img-frame next-user" ref="currUserCard">
          <div class="img-container">
            <img v-if="nextUser && nextUser.photos" :src="nextUser.photos && nextUser.photos[0]">
          </div>
  
          <div v-if="nextUser" class="user-details" @click="expand = !expand">
            <h4 class="photo-txt">{{ nextUser.name }}, {{ newDate - nextUser.birth }}
              <md-icon>keyboard_arrow_up</md-icon>
            </h4>
            <div class="third-card"></div>
          </div>
        </div>
  
        <!--//===========================================:user='currUser'=======-->
        <transition name="fade">
          <div id="curr-user-frame" v-if="drageVals.showUser " class="img-frame curr-user" ref="currUserCard">
  
            <div class="img-container" @mousemove="touchMove" @touchmove="touchMove" @mousedown="dragModeTrue" @mouseup="dragModeFalse" @touchstart="dragModeTrue" @touchend="dragModeFalse">
              <div v-if="drageVals.msg" id="v-like-tag" :class="vClass()">{{drageVals.msg}} </div>
              <img v-if="currUser && currUser.photos" :src="currUser.photos && currUser.photos[0]">
              <!--<p @click="expand = !expand">
                                <!--<md-icon>keyboard_arrow_down</md-icon>-->
              <!--</p>-->
            </div>
  
            <div v-if="currUser" class="user-details" @click="expand = !expand">
              <!--<div class="user-details" @click.stop="showUserDetails">-->
  
              <h4 class="photo-txt">
                {{ currUser.name }}, {{ newDate - currUser.birth }}
                <md-icon :class="arrowExpendClass()">keyboard_arrow_up</md-icon>
              </h4>
              <!--<div class="expand" @click.stop="expand = !expand">-->
            </div>
            <div v-if="currUser" class="expand">
              <transition name="slide-fade">
                <div class="description" v-show="expand" @click="expand = !expand">
                  <!--dhsbt<br>rtvhtrvsyr<br>yceywecy<br>we4tr3tq<br>34tq4t-->
                  <h4>{{ currUser.name }}, {{ newDate - currUser.birth }}</h4>
                  <p> {{currUser.description}}</p>
                </div>
              </transition>
  
            </div>
          </div>
        </transition>
        <!--//==================================================-->
  
      </div>
  
      <!--<section class="actions" v-if="!newMatch">-->
      <section class="actions">
        <a href="#" @click.prevent="launchLikeAction($event, 'left')">
          <md-icon class="material-icons md-size-2x dislike">highlight_off</md-icon>
              <div class = "counter">{{thisUser.likesCount.disLikes}}
              </div>
          <div v-if="thisUser && thisUser.likesCount" ></div>
        </a>
        <a @click.prevent="initLikes()">
          <md-icon class="material-icons md-size-2x middle">highlight_on</md-icon>
          {{thisUser.likesCount.total}}
        </a>
        <a @click.prevent="launchLikeAction($event, 'right')">
          {{thisUser.likesCount.likes}}
        <!--{{thisUser.likesCount.likes}}-->
          <md-icon class="material-icons md-size-2x like heart">favorite</md-icon>
        </a>
      </section>
  
      <transition name="fade">
        <div v-if="newMatch" transition="fade" class="match-popup">
          <h1>Congratulations! </h1>
          <h1> You have a NEW MATCH! </h1>
          <img v-if="newMatch.photos" class="popup-image" :src="this.newMatch.photos[0]"></img>
          <span>You and {{this.newMatch.name}} like each other</span>
          <div class="popup-buttons">
            <el-button class="button" @click="closePopup">CLOSE</el-button>
            <el-button class="button" @click="viewMatches">View Matches</el-button>
          </div>
        </div>
      </transition>
  
    </div>
  </transition>
</template>

<script>
import { LOG_IN } from '../store/store'
import { LOG_OUT } from '../store/store'
import { SND_MSG } from '../store/store'
import { GET_BROWSED } from '../store/store'
import { GET_MATCHED } from '../store/store'
import { ADD_USER } from '../store/store'
import { LIKE } from '../store/store'
import { RESTART_USERS } from '../store/store'
import { GET_USER } from '../store/store'
import Vue from 'vue'
import Sortable from 'vue-sortable'

// Vue.use(Sortable)

export default {
  name: 'browse',
  data() {
    return {
      msg: 'Browse screen',
      expand: false,
      newMatchFlag: false,
      newDate: 2017,
      currentId: 'TBD - need to grab ID from click',
      userIdx: 0,
      currUser: '',
      nextUser: '',
      // thisUser:this.$store.getters.fetchCurrUser,
      // likes: {likes:0, dislikes:0},

      drageVals: {
        dragStatus: 'init',
        initialLeft: null,
        initialTop: null,
        initialMouseX: null,
        startX: null,
        startY: null,
        msg: '',
        totalXDist: 0,
        parentEl: null,
        frameEl: null,
        parentWidth: null,
        diff: 50,
        xPercent: 0,
        showUser: true,
        isDraged: false,
        opacity: 1,
        rotate: 0
      }
    }
  },
  mounted() {
    // this.users = this.$store.getters.fetchUsersBrowsed;
    // this.drageVals.frameEl =  document.getElementById("curr-user-frame");
    // this.drageVals.parentEl =  document.getElementById("browse-div");
    console.log(this.$refs, '000000000000000000')
    // this.width = this.$refs.card.offsetWidth;
    // this.pushUsers();
    var that = this;
    // setTimeout(function () {
      // that.drageVals.frameEl = document.getElementById("curr-user-frame");
      // that.drageVals.parentEl = document.getElementById("browse-div");
      // that.initEl('mounted.frameEl', that.drageVals.frameEl)
      // that.pushUsers();
    // }, 50);
  },
  created() {
    console.log(this.nextUser, 'sdfsdfsdfsddsfsf')
    this.$store.dispatch({ type: GET_BROWSED })
      .then(x => console.log(x));
    console.log('browse: created - after GET_BROWSED');
    this.$store.dispatch({ type: GET_MATCHED });

    this.$router.push('Browse');
    // this.pushUsers();
    this.users = this.$store.getters.fetchUsersBrowsed;

  },

    watch: {
    users: function (newUsers) {//
      if (this.drageVals.dragStatus=== 'init'){
          console.log('BROWSE.watch.drageVals',this.drageVals.dragStatus);
          var that = this;
          // setTimeout(function () {
              that.pushUsers();
          // }, 540);
      }
    },
    thisUser: function (updatedUser) {
        console.log('BROWSE.watch.thisUser',this.$store.getters.fetchCurrUser);
       this.thisUser = this.$store.getters.fetchCurrUser;
    }
  },

  computed: {
    thisUser(){
      return this.$store.getters.fetchCurrUser
    },

    users() {
      var users11 = this.$store.getters.fetchUsersBrowsed;
      console.log('browse: computed - users:', users11);

      return users11;
    },
    ready: function () {
      window.addEventListener('resize', this.initEl);
      this.initEl('ready');
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.initEl)
    },
    // user() {
    //   return this.currUser;
    // },
    newMatch() {
      return this.newMatchFlag && this.$store.getters.fetchLastMatch;
    }
  },

  methods: {
    showUserDetails(e) {
      e.preventDefault();
      // this.expand = !this.expand;
      console.log('rrrrrrrrrrrrrrrrrrrrrrrr')
    },
    vClass() {

      if (this.drageVals.xPercent == 0) {
        this.drageVals.msg = '';
        return;
      }
      var str = (this.drageVals.xPercent > 0) ? 'v-like-action v-like' : 'v-like-action v-dislike';
      console.log('vClass', str)
      return str
      // return (this.drageVals.xPercent >0) ?  'v-like-action v-like' : 'v-like-action v-dislike';
    },

    arrowExpendClass() {
      if (this.expand) {
        return "upSideDown arrow-expend material-icons slide-home";
      } else {
        return "arrow-expend material-icons slide-home";
      }
    },


    pushUsers() {
      console.log('pushUsers.users', this.users)
      this.userIdx = (this.userIdx === this.users.length - 1) ? 0 : this.userIdx + 1;
      this.currUser = (this.nextUser) ? this.nextUser : this.users[0];
      this.nextUser = this.users[this.userIdx];
    },
    dragModeTrue(e) {
      console.log('dragModeTrue.drageVals.dragStatus1', this.drageVals.dragStatus)
      e.preventDefault();
      this.initEl('dragModeTrue')

      if (this.drageVals.dragStatus === 'init') {     //only on first round  
        console.log('dragModeTrue.1.5.e.path[2].offsetTop', e.path[2].offsetTop)
        this.drageVals.startX = this.drageVals.frameEl.offsetLeft;
      }
      if (e.clientX) {                //big screen
        this.initialMouseX = e.clientX;
        this.initialMouseY = e.clientY;
      } else {                        //mobile
        this.initialMouseX = e.changedTouches[0].clientX;
        this.initialMouseY = e.changedTouches[0].clientY;
      }
      this.drageVals.parentWidth = this.drageVals.parentEl.getBoundingClientRect().width;
      this.drageVals.dragStatus = 'clicked';
      console.log('dragModeTrue.drageVals.dragStatus2', this.drageVals.dragStatus)
    },
    dragModeFalse(e) {
      console.log('dragModeFalse.e.path[2].offsetLeft.left', this.drageVals.frameEl.style.top)
      this.isDraged = false;
      this.showUser = false;
      if (this.drageVals.dragStatus === 'clicked') {
        this.slideHome(e);

      }

      this.drageVals.dragStatus = 'unclicked'
      console.log('dragModeFalse.end')
    },
    //===================================
    slideHome(e) {
      console.log('------------slideHome.211');
      var t = 9;
      var vals = this.drageVals;
      // if(this.drageVals.dragStatus=== 'clicked') return;

      vals.frameEl.classList.add("slide-home")
      vals.frameEl.style.left = this.drageVals.startX + 'px';
      vals.frameEl.style.opacity = 1;
      vals.frameEl.style.transform = `rotate(0deg)`;
      this.drageVals.dragStatus = 'unclicked';
      this.drageVals.msg = '';
      this.drageVals.xPercent = 0;
      var that = this;
      setTimeout(function () {
        that.drageVals.frameEl.classList.remove("slide-home")
      }, 300);


    },
    initEl(msg) {
      this.drageVals.frameEl = document.getElementById("curr-user-frame");
      console.log('initEl', document.getElementById("curr-user-frame"), '/msg', msg);
      this.drageVals.parentEl = document.getElementById("browse-div");
      if (this.drageVals.frameEl && !this.drageVals.startX) {
        this.drageVals.startX = this.drageVals.frameEl.offsetLeft;
        this.drageVals.parentWidth = this.drageVals.parentEl.getBoundingClientRect().width;
      }
      console.log('88888888888888888888888888888888');
    },
    //===================================
    goHome(e) {
      console.log('------------goHome.224', this.drageVals.frameEl);
      if (!this.drageVals.frameEl) this.initEl('goHome')

      this.drageVals.frameEl.classList.remove("fly-out")
      this.drageVals.frameEl.style.left = this.drageVals.startX + 'px';
      this.drageVals.frameEl.style.opacity = 1;
      this.drageVals.frameEl.style.transform = `rotate(0deg)`;
      var el = document.getElementById("v-like-tag");//v-like
      if (el) {
        // el.classList.remove("v-like");
        // el.classList.remove("v-dislike");
      }
      this.drageVals.dragStatus = 'unclicked';
      this.drageVals.msg = '';
    },
    //===================================
    flyOut(e, direction) {
      // console.log( '------------flyOut.',e.path[2],this.drageVals.frameEl);


      if (!this.drageVals.parentWidth) this.initEl('flyOut')
      this.drageVals.msg = '';
      var leftStr = this.drageVals.parentWidth + 100 + 'px'
      var rotateStr = 30;
      if (direction === 'left') {
        leftStr = -70 - this.drageVals.parentWidth + 'px';
        rotateStr = -30;
      }
      var el = document.getElementById("curr-user-frame");
      el.classList.add("fly-out")
      var str = el.offsetLeft;
      el.style.left = str + 'px';

      el.style.left = leftStr;
      el.style.transform = `rotate(${rotateStr}deg)`;
      var ev = e
      var that = this;
      setTimeout(function () {
        console.log('flyOut.setTimeout');
        el.classList.remove("fly-out")
        that.goHome(e);
        that.pushUsers();
      }, 500);

    },
    //===================================
    touchMove(e) {
      if (this.drageVals.dragStatus === 'clicked') {
        // console.log('touchMove.e' , e);
        this.followMouse(e);
      }
    },
    //===================================
    followMouse(e) {
      // console.log('followMouse.e' , e);

      var vals = this.drageVals;
      // var el = e.target;
      vals.status = 'followMouse';
      if (e.clientX) {
        var dx = (e.clientX - this.initialMouseX);
      } else {
        // var dx = (e.changedTouches[0].clientX - this.initialMouseX);
        var dx = (e.changedTouches[0].clientX - this.initialMouseX);
      }
      vals.frameEl.style.left = this.drageVals.startX + dx + 'px';

      vals.xPercent = (dx) / (vals.frameEl.getBoundingClientRect().width);
      vals.opacity = (4 * Math.abs(vals.xPercent))
      var els = document.getElementsByClassName("v-like-action")[0];
      if (els) els.style.opacity = vals.opacity;

      // console.log('vals.e.changedTouches[0].clientX :',vals.xPercent)
      vals.msg = (vals.xPercent > 0) ? 'Like' : 'Dislike';


      vals.rotate = 70 * vals.xPercent
      vals.frameEl.style.transform = `rotate(${vals.rotate}deg)`;
      // e.path[2].style.opacity  =vals.opacity;

      // console.log('followMouse.msg', vals.msg, vals.xPercent );
      if (Math.abs(vals.xPercent) > 0.3) {
        if (vals.xPercent > 0) {
          this.flyOut(e, 'right');
          this.userLike(e);
        } else {
          this.flyOut(e, 'left');
          this.userDislike(e);
        }
        var that = this;
      }
    },
    //===================================

    onSwipe(sw) {
      console.log(sw);
    },
    moveToMatches() {
      console.log('Browse: move to MATCHES ')
      this.$router.push('Matches')
    },
    moveToEdit() {
      console.log('Browse: MOVE to edit')
      this.$router.push('Edit')
    },
    initLikes(){
      const msg = { id1: this.$store.state.user.currUser.id, opt: 'initLikes' }
      this.$store.dispatch({ type: LIKE, data: msg })
    },
    launchLikeAction(e, direction) {
      if (this.expand) {
        this.expand = false;
        var that = this;
        setTimeout(function () {
          that.flyOut(e, direction);
          (direction === 'left') ? that.userDislike(e) : that.userLike(e);
        }, 700);

      } else {
        this.initEl('launchLikeAction');
        this.flyOut(e, direction);
        this.drageVals.dragStatus = 'clicked';
        (direction === 'left') ? this.userDislike(e) : this.userLike(e);
      }
    },
    userDislike(e) {
      if (this.drageVals.dragStatus != 'clicked') return;
      console.log('Browse: before DISLIKE! id:', this.userIdx, this.users.length)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.currUser.id, opt: 'dislike' }
      this.$store.dispatch({ type: LIKE, data: msg })
      console.log('Browse:  DISLIKE! id:', this.userIdx, this.users.length)
      var el = document.getElementsByClassName("fly-out")[0];
      console.log('Browse:  DISLIKE.el:', el)
      this.drageVals.dragStatus = 'afterLikeEvent';
    },
    userLike(e) {
      this.newMatchFlag = true;

      if (this.drageVals.dragStatus != 'clicked') return;
      console.log('Browse: before LIKE! id:', this.userIdx, this.users.length)
      const msg = { id1: this.$store.state.user.currUser.id, id2: this.currUser.id, opt: 'like' }
      this.$store.dispatch({ type: LIKE, data: msg })
      console.log('Browse:  LIKE! id:', this.userIdx, this.users.length)

      var el = document.getElementsByClassName("fly-out")[0];
      console.log('Browse:  LIKE.el:', el)
      this.drageVals.dragStatus = 'afterLikeEvent';
    },
    viewMatches() {
      console.log('Browse: clicked on "VIEW MATCHES"')
      this.newMatchFlag = false;
      // var that  = this;
      this.moveToMatches();
    },
    closePopup() {
      console.log('Browse: clicked on "CLOSE POPUP"')
      this.newMatchFlag = false;
    }

  }
}


</script>

<style scoped lang="scss">
.v-like-action {
  position: absolute;
  top: 20px;
  z-index: 5;
  font-size: 3em;
  padding: 0.3em;
  border-radius: 7px;
  opacity: 0;
  background-color: rgba(230, 230, 230, 0.2);
}

.v-like {
  color: green;
  border: 2px solid green;
  left: 20px;
}

.v-dislike {
  color: red;
  border: 2px solid red;
  right: 20px;
}

.fly-out {
  transition: .5s all;
}

.slide-home {
  transition: .3s all;
}

.main {
  overflow: hidden;
}

.browse {
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  height: 75vh;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  background-color: rgba(250, 230, 230, 0.9);
  overflow: hidden;
}

// .user-details:after {
//     min-width:100%;
//     border-bottom:5px solid red;
//     // width:100%;
//     height:100%;
//     content:'t';
//     //  margin-right:-100%;
// }
// .third-card {
//   z-index:0;
//   width:95%;
//   margin:auto;
//   height:20px;
//   background-color: red;
//   margin-top:-20px;
// }
.next-user .user-details {
  box-shadow: 0px 15px 15px -15px #555;
}

.user-details {
  position: relative;
  white-space: nowrap;
  width: 100%;
  font-size: 1.5em; // overflow: hidden;
  text-overflow: clip ellipsis;
  z-index: 6;
  background-color: #c4a6a6;
  height: 3em;
  border-right:1px solid lightgray;
  border-bottom:1px solid lightgray;
  border-left:1px solid lightgray;
  cursor: pointer; // box-shadow:0 0 15px gray;
  padding-top: 1em; // box-shadow: inset -3px 0px 10px 0px #ABABAB ,0px 10px 0px -3px #DDDDDD ;
  h4 {
    margin-top: 0;
  }
}

.upSideDown {
  transform: rotate(180deg);
}

.actions {
  top: 100px;
  padding: {
    top: 0.5em;
    right: 2em;
    bottom: 1em;
    left: 2em;
  }
  display: flex;
  justify-content: space-between;
  flex-wrap:wrap;
  background: lightgrey;
    a{
    cursor: pointer;
    overflow: hidden;
    // outline:1px solid red;
  }
  .counter{
    font-size: 2em;

  }
  .like {
    left: 2em;
    color: red;
    opacity: 0.9;
    // cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .dislike {
    right: 2em;
    color: rgba(124, 1, 87, 1);
    opacity: 0.8;
    // cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
}

.img-frame {
  // transition: all 0.2s;
  // background: lightgrey;
  position: absolute;
  top: 8%;
  width: 85%;
  height: 70%; // margin:auto;
}

.next-user {
  z-index: 1;
}

.curr-user {
  z-index: 2; // display:none;
}

.img-container:active {
  cursor: -webkit-grabbing; // cursor:-moz-grabbing;
}

.photo-txt {
  font-size: 1em;
  color: rgba(124, 1, 87, 1);
}

.img-container {
  display: flex;
  justify-content: center; // background: rgba(230, 230, 230,1);
  // background-color:#E7BEBD;
  background: linear-gradient(to bottom, #E6C0BE, #E5CBC6);
  width: 100%;
  border-top: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-left: 1px solid lightgray;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  height: 100%; // position: relative;
  overflow: hidden; // background: linear-gradient(to bottom, #eb5757, #e1b496); 
  img {
    height: 100%;
    max-width: none; // min-width: 100%;
    margin-right: auto;
    margin-left: auto;
  }
}

.match-popup {
  position: fixed;
  top: 0;
  left: 0;
  background-color: gray;
  z-index: 1000;
  width: 100%;
  height: 100%;
  line-height: 3em;
  color: white;
  text-shadow: -1px -1px 2px rgba(89, 89, 89, 0.66); // background-color: lightseagreen;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.popup-image {
  max-width: 15em;
  max-height: 15em;
}

.popup-buttons {
  width: 100%; // position: absolute;
  // bottom:10vh;
  .button {
    font-family: 'Kurale', Helvetica, Arial, sans-serif;
    text-transform: uppercase;
    margin-bottom: 1.5em;
  }
}


.expand {
  cursor: pointer;
}

.fade-enter-active {
  transition: opacity .8s
}

.fade-enter,.fade-leave-to{
  opacity: 0
}

.el-hide {
  visibility: hidden;
}

.description {
  background: rgba(225, 217, 217, 1);
  position: absolute;
  display: block;
  width: 100%;
  bottom: 0;
  height: 100%;
  z-index: 5;
  font-size: 1.5em; // box-shadow:0 0 15px gray;
  opacity: 0.9; // outline: 1px solid red;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.slide-fade-enter-active {
  transition: all .5s ease; // height:100%;
  // opacity:0;
}

.slide-fade-leave-active {
  transition: all .8s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  // transform: translateY(100%);  
  height: 0;
  overflow: hidden;
}

.slide-fade-down-enter-active {
  transition: all .5s ease;
  // height: 0;
}

.slide-fade-down-leave-active {
  // height: 0;
  transition: all .8s;
}


* {
  // outline: 1px solid red;
}
</style>
 