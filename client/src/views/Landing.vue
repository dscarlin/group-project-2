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
      <div class="carousel-item active" :style="{ backgroundImage: 'url(' + require('../../public/images/upload_images/phone_talk.jpg') + ')'}">
      <!-- :style="{ backgroundImage: 'url(' + require('@/assets/images/cards.jpg') + ')' }"> -->
        <div class="carousel-caption d-none d-md-block">
          <h3 class="display-4">First Slide</h3>
          <p class="lead">This is a description for the first slide.</p>
        </div>
      </div>
      <!-- Slide Two - Set the background image for this slide in the line below -->
      <div class="carousel-item" :style="{ backgroundImage: 'url(' + require('../../public/images/upload_images/phone_talk4.jpg') + ')'}">
        <div class="carousel-caption d-none d-md-block">
          <h3 class="display-4">Second Slide</h3>
          <p class="lead">This is a description for the second slide.</p>
        </div>
      </div>
      <!-- Slide Three - Set the background image for this slide in the line below -->
      <div class="carousel-item" :style="{ backgroundImage: 'url(' + require('../../public/images/upload_images/phone_talk5.jpg') + ')'}">
        <div class="carousel-caption d-none d-md-block">
          <h3 class="display-4">Third Slide</h3>
          <p class="lead">This is a description for the third slide.</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
  </div>
</header>
<div>
  <p class="two">Some text.</p>
</div>
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
      msg: {

      },
      notification: "Steven Wright for the next 45 minutes"
    }
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
.landing {
  background-image: url("../../public/images/upload_images/phone_talk.jpg");
  background-size: cover;
  // height: calc(100vh - $headerHeight);
  //  background: linear-gradient(to right, #00a799, #b7e3e4);
  height: 100vh;
  min-height: 350px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
