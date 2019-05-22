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
</style>
