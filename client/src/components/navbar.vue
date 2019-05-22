<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-fixed-top sticky">
      <div class="container">
        <a class="navbar-brand" href="#">
          <router-link to="/">
            <img src="http://placehold.it/150x50?text=Logo" alt>
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
              <router-link :to="{ name: 'groups', params: { id: userId } }" class="nav-link">My Groups</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Create Group</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/signup" class="nav-link">My Profile</router-link>
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
          </ul>

        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  props: {
    loggedIn: Boolean,
    userId: Number
  },
  data: function() {
    return {
      

    }
  }
};
</script>