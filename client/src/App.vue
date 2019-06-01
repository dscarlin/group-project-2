<template>
  <div id="app">
    <div id="nav">
      <navbar @loggedOut="logMeInOrOut" v-bind:userId="userId" v-bind:loggedIn="loggedIn" ></navbar>
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
    axios.get('/loginStatus').then(res => {
      console.log('created: ',res)
      this.userId = res.data.id || null
      this.loggedIn = res.data.id ? true : false
      if(res.data == false)
        this.$router.push({ name: 'landing'})

        
    })
  },
  methods: {
    logMeInOrOut: function(object) {
      console.log('log in ',object)
      this.loggedIn= object.loggedIn
      this.userId = object.id
      if(object.loggedIn)
        this.$router.push({name: 'groups', params: { id: this.userId }})
      else
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
