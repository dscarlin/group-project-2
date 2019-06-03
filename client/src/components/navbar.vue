<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-fixed-top sticky">
      <div class="container">
        <a v-if="loggedIn" class="navbar-brand">
          <router-link :to="{ name: 'groups', params: { id: userId } }">
            <img class="logo" src="../../public/images/reconnect-logo.png" alt>
          </router-link>
        </a>
        <a v-else class="navbar-brand">
          <router-link to="/">
            <img class="logo" src="../../public/images/reconnect-logo.png" alt>
          </router-link>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul v-if="loggedIn" class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link
                :to="{ name: 'groups', params: { id: userId } }"
                class="nav-link"
              >My Groups</router-link>
            </li>
            <li class="nav-item">
              <router-link
                :to="{ name: 'profile', params: {id: userId}}"
                class="nav-link"
              >My Profile</router-link>
            </li>
            <li class="nav-item">
              <a @click="logMeOut" class="nav-link pointer">Log Out</a>
            </li>
          </ul>
          <ul v-else class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/about" class="nav-link">About us</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Log in</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link">Sign up</router-link>
            </li>
            <hr>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "navbar",
  props: {
    loggedIn: Boolean,
    userData: Object,
   
  },
  watch: {
    userData: function() {
      if(this.userData)
        this.userId = this.userData.id
    }
  },
  data: function() {
    return {
      userId: null
    };
  },
  methods: {
    logMeOut: function() {
      axios.get("/logout").then(res => {
        console.log(res);
        this.$emit('clearStatus');
        this.$emit("loggedOut", { loggedIn: res.data, id: null });
      });
    }
  }
};
</script>

<style lang="scss">
.logo {
  width: 20vw;
}
.pointer:hover {
  cursor: pointer;
}
#nav {
  nav {
    background-color: white;
    // background: linear-gradient(to bottom, white, #ffffff00);
  }

  .navbar-toggler-icon {
    background-image: url("https://mdbootstrap.com/img/svg/hamburger7.svg?color=ff585b");
  }

  .nav-link {
    font-family: "Quicksand", sans-serif;
    color: black;
    text-decoration: none;
    display: inline-block;
    &.router-link-exact-active {
      color: #ff585b;
    }
  }
  .nav-link::after {
    content: "";
    display: block;
    width: 0;
    height: 3px;
    background: #ff585b;
    transition: width 0.3s;
  }
  .nav-link:hover::after {
    width: 100%;
    transition: width 0.3s;
  }
}
</style>