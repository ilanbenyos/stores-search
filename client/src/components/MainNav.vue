<template>
  <div>
    <router-link to="/Branches"><button>edit branches</button></router-link>
    <router-link to="/Shops"><button>edit shops</button></router-link>
    <router-link to="/User"><button>user screen</button></router-link>
  </div>
</template>

<script>

export default {
  name: 'mainnav',
  data() {
    return {
      msg: 'NAV',
    }
  },
  // watch: {
  //   '$route': function(window) {
  //     console.log('MainNav-watch: in ' , window, 'screen')
  //   }
  // },
  computed: {
    isBrowseScreen() {
      return (this.$route.name === "Browse")
    },
    unreadCount() {
      return this.$store.getters.fetchUnreadMessgesCount;
    },
    currUser() { return this.$store.state.user.currUser }

  },
  methods: {
      goToCard(){
          this.$router.push('login');
      },

    navigate() {
      this.isBrowseScreen = !this.isBrowseScreen;
    },
  }
}
</script>

<style scoped lang="scss">
.image-badge-container {
  position: absolute; //background-color: blue;
  // display: flex;
  // justify-content: flex-end;
  // align-items: flex-start; //z-index: 5;
}
.navbar{
  // position:fixed;
}

</style>
-