<template>
  <div id="app">
    <div id="nav">
      <navbar 
      v-bind:loggedIn="loggedIn" 
      v-bind:userId="userId.id"
      ></navbar>
    </div>
    <router-view/>
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
      userId: {id: 1}
    }
  },
  created: function(){
    this.onLogin()//this is just because we are not logging in yet
  },
  methods: {
    onLogin: function() {
      this.loggedIn = true;
      this.getUserId();
    },
    getUserId: function(){
      axios.get('api/userId').then(
      (response) => {
      console.log(response.data);
      this.userInfo = response.data.id;//this will change slightly
      }
    );
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

#nav {
  nav {
    background-color: none;
    // opacity:
  }

  .navbar-toggler-icon {
    background-image: url("https://mdbootstrap.com/img/svg/hamburger7.svg?color=ff585b");
  }
  
  a {
    font-family: "Quicksand", sans-serif;
    color: black;
    &.router-link-exact-active {
      color: #ff585b;
    }
  }
}
</style>
