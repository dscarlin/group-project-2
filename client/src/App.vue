<template>
  <div id="app">
    <div id="nav">
      <navbar @logOut="logMeInOrOut" v-bind:userId="userId" v-bind:loggedIn="loggedIn" ></navbar>
    </div>
    <router-view @loggingIn="logMeInOrOut" @updateProfile="updateProfile"/>
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
      else{
        this.loggedIn = value;
        this.userId = null
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
    updateProfile: function(formData) {
      console.log('axios update profile ')
      console.log('data ',formData)
      let headers = {headers: { 'content-type': 'multipart/form-data' } };
      axios.put(`/api/user/${this.userId}`,formData,headers).then(res => console.log(res))
    }
    
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
