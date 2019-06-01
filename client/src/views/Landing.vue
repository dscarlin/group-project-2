<template>
  <div class="main">
    <header>
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
          <!-- Slide One - Set the background image for this slide in the line below -->
          <div
            class="carousel-item active"
            :style="{ backgroundImage: 'url(' + require('../../public/images/upload_images/phone_talk.jpg') + ')'}"
          ></div>
          <!-- Slide Two - Set the background image for this slide in the line below -->
          <div
            class="carousel-item"
            :style="{ backgroundImage: 'url(' + require('../../public/images/upload_images/phone-talk2.jpeg') + ')'}"
          ></div>
          <!-- Slide Three - Set the background image for this slide in the line below -->
          <div
            class="carousel-item"
            :style="{ backgroundImage: 'url(' + require('../../public/images/upload_images/phone-talk3.jpeg') + ')'}"
          ></div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <div class="card sign-up-card">
        <div class="card-body">
          <h5 class="card-title sign-up-card-title">
            Stop
            <br>Playing
            <br>Phone
            <br>Tag
          </h5>
          <button class="btn sign-up-btn">
            <router-link to="/signup" class="sign-up-router">Sign up for free</router-link>
          </button>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 mx-auto">
          <div class="row" id="about-heading">
              <h2>How it works</h2>
          </div>
          <p id="about">
            You're finally free and want to catch up with friends, family or co-workers, but don't want to spend endless amounts of time searching for people who are free.
            <br>
            <br>
            <b>We've got you covered...</b>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col 4">
          <img src="../../public/images/upload_images/group.png" class="home-icon">
          <br>
          <p class="caption">Create Groups</p>
        </div>
        <div class="col 4">
          <img src="../../public/images/upload_images/clock.png" class="home-icon">
          <br>
          <p class="caption">Set Availability</p>
        </div>
        <div class="col 4">
          <img src="../../public/images/upload_images/connect.png" class="home-icon">
          <br>
          <p class="caption">Connect</p>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "navbar",
  props: {
    loggedIn: Boolean,
    userId: Number
  },
  data: function() {
    return {
      range: 0,
      msg: {},
      notification: "Steven Wright for the next 45 minutes"
    };
  },
  created: function() {
    // let message = this.notification
    // this.notifyMe(message);
  },
  methods: {
    logMeOut: function() {
      axios.get("/logout").then(res => {
        console.log(res);
        this.$emit("loggedOut", { loggedIn: res.data, id: null });
      });
    }
  }
};
</script>

<style lang="scss">
body {
  overflow-x: hidden;
}

.carousel-item {
  height: 85vh;
  min-height: 350px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.sign-up-card-title {
  color: black;
  font-size: xx-large;
  font-weight: 900;
  line-height: 1.5em;
}

.sign-up-card {
  float: left;
  position: absolute;
  left: 65%;
  top: 25%;
  width: 15em;
  border: none;
  // box-shadow: 10px 10px 5px grey;
  box-shadow: 10px 7px 17px 15px rgba(220, 220, 220, 0.35);
  // height: 22em;
  border-radius: 0;
  text-align: left;
  padding: 20px;
}

.sign-up-btn {
  background-color: #ff585b;
  color: white;
  border-radius: 0;
}

.sign-up-btn {
  background-color: #ff585b;
  color: white;
}

.sign-up-router {
  color: white;
}

.sign-up-router:hover {
  color: black;
  text-decoration: none;
}

.home-icon {
  margin-top: 20px;
  height: 80px;
  width: 80px;
}

#about-heading {
  color: black;
  margin-top: 20px;
  text-align: left;
  border-bottom: 2px dotted #ff585b;
}

#about {
  text-align: left;
  font-size: x-large;
  margin-top: 20px;
  color: black;
}

.caption {
  color: black;
  letter-spacing: 2px;
  margin-top: 5px;
}

@media (max-width: 991px) {
  .sign-up-card {
    display: none;
  }
}

@media (max-width: 930px) {
  .sign-up-card {
    left: 60%;
  }
}

@media (max-width: 780px) {
  .sign-up-card {
    left: 50%;
  }
}

@media (max-width: 600px) {
  .sign-up-card {
    left: 40%;
  }
}

@media (max-width: 485px) {
  .sign-up-card {
    left: 30%;
  }
}

@media (max-width: 400px) {
  .sign-up-card {
    left: 20%;
  }
}

@media (max-width: 350px) {
  .sign-up-card {
    left: 17%;
  }
}
</style>
