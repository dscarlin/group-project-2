<template>
  <div id="app">
    <div id="nav">
      <navbar></navbar>
    </div>
    <router-view/>
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
export default {
  name: "app",
  components: {
    navbar
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
