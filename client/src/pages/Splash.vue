<template>
  <transition name="fade">

  <section>
    <!--<h1> SPLASH SCREEN </h1>
    <h2> need to check if loggedin and move to login screen </h2>-->
    <!--<img src="http://10steps.sg/wp-content/uploads/article141/funnycouple_24.jpg">-->
   <div class="image-container">
    <img class="splash-image" src="../assets/splash.jpg">
    </div>
  </section>
  </transition>

</template>


<script>
export default {
  name: 'splash',
  created(){
    var that = this;
        setTimeout(function(){that.$router.push('Branches')}, 3000);      
  },


  mounted() {
  },

  computed: {
  },

}


</script>

<style scoped>

.image-container{
 background-color: pink;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.users-list {
  display: flex;
}

.users-list-item {
  background-color: lightgray;
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-bottom: 2px;
  justify-content: space-between;
}

.user-photo {
  display: flex;
  flex-direction: column;
}

.last-chat-line {
  color: purple;
}

.buttons-zone {
  display: flex;
  flex-direction: column;
}
.fade-enter-active {
    transition: opacity 3s
}

.fade-enter,.fade-leave-to{
  opacity: 0
}


</style>
