<template>
  <transition name="fade">
    <div class="main">
      {{msg}}
      <button class="button" @click="goToLogin">goToCard</button>
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


export default {
  name: 'browse',
  data() {
    return {
      msg: 'Browse screen',
    }
  },



  methods: {
      goToLogin(){
          this.$router.push('Login');
      },
  }
}


</script>

<style scoped lang="scss">
* {
  // outline: 1px solid red;
}
</style>
 