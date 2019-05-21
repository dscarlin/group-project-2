<template>
  <div>
    <nav class="navbar navbar-expand-lg static-top">
      <div class="container">
        <a class="navbar-brand" href="#">
          <img src="http://placehold.it/150x50?text=Logo" alt>
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
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">About us</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Log in</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Sign up</a>
            </li>
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