<template>
  <div id="app">
    <div id="nav">
      <navbar @loggedOUt="logMeInOrOut" v-bind:userId="userId" v-bind:loggedIn="loggedIn" ></navbar>
    </div>
    <router-view @loggedIn="logMeInOrOut"/>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    navbar,
  },
  data: function() {
    return {
      loggedIn: false,
      userId: null
    }
  },
  created: function(){
    get('/loginStatus').then(res => {
      this.userId = res.user.id || null
      this.loggedIn = res.user.id ? true : false
        
    })
  },
  methods: {
    onLoginOrOut: function(loggedIn, id) {
      
      this.loggedIn = loggedIn;
      this.userId = id || null;
      if (loggedIn)
      this.$router.push({name: 'groups', params: { id: this.userId }})
        
      
      
    },
   

    logMeInOrOut: function(object) {
      let loggedIn = object.loggedIn
      let id = object.id
      this.onLoginOrOut(loggedIn, id);
      if(!loggedIn)
        this.$router.push({name: 'landing'})
    },
    
    
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
