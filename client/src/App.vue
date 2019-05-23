<template>
  <div id="app">
    <div id="nav">
      <navbar @logOut="logMeInOrOut" v-bind:userId="userId" v-bind:loggedIn="loggedIn" ></navbar>
    </div>
    <router-view @loggingIn="logMeInOrOut"/>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    navbar
  },
  data: function() {
    return {
      loggedIn: false,
      userId: null
    }
  },
  created: function(){
    
  },
  methods: {
    onLoginOrOut: function(value) {
      if (value){
        this.getUserId().then(response => {
          this.loggedIn = value;
          this.userId = response.data.id;
          this.$router.push({name: 'groups', params: { id: this.userId }})
        });
      }
    },
    getUserId: function() {
      return axios.get('api/userId')
    },

    logMeInOrOut: function(boolean) {
      this.onLoginOrOut(boolean);
      if(!boolean)
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
