<template>
<div class="main">
  <body class="landing">
    <div>
      <h2>Stop Playing Phone Tag</h2>
      <button>Sign Up For Free</button>
    </div>
  </body>
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
  // background-size: cover;
  // height: calc(100vh - $headerHeight);
  //  background: linear-gradient(to right, #00a799, #b7e3e4);
  height: 100vh;
}
</style>
