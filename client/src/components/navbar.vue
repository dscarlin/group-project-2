<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-fixed-top sticky">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img src="http://placehold.it/150x50?text=Logo" alt>
        </router-link>
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
          <ul class="navbar-nav ml-auto">
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
export default {
  name: "navbar"
};
</script>

<style lang="scss">
#nav {
  nav {
    background-color: none;
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