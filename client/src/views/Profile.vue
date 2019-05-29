<template>
  <div class="profile">
   <section class="profile py-5 ">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mg-top auto"  >
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <div class="img-wrapper ">
                  <img v-if="picture_ref" v-bind:src="'/images/upload_images/' + picture_ref" id="profileThumbnail"/>
                  <div class="fileUploadWrapper">
                    <input
                      type="file"
                      ref="picture"
                      accept="image/*"
                      v-on:change="handleFileUpload()"
                      id="inputPicture"
                      class="form-control "
                      autocomplete="on"
                    >
                    <div class="tooltip">
                    <span class="tooltiptext">Upload New Picture</span>
                    </div>
                  </div>
                </div>
                <h5 class="card-title text-center">My Profile</h5>
                <form   @submit.prevent="updateProfile" autocomplete="on" >
                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputName"
                      v-model="name"
                      class="form-control"
                      placeholder="Name"
                      required
                      autofocus
                      autocomplete="on"
                    >
                    <label for="inputName">Name</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      v-model="email"
                      class="form-control"
                      placeholder="Email address"
                      required
                      autocomplete="on"
                    >
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="text"
                      id="inputPhoneNumber"
                      v-model="phoneNumber"
                      class="form-control"
                      placeholder="Phone Number"
                      required
                      autocomplete="on"
                    >
                    <label for="inputPhoneNumber">Phone Number</label>
                  </div>

                  <div class="form-label-group">
                    
                    
                    <label for="inputPicture">Picture</label>
                  </div>

                  <div class="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      v-model="password"
                      class="form-control"
                      placeholder="Password"
                      required
                      autocomplete="on"
                    >
                    <label for="inputPassword">Password</label>
                  </div>

                  <div class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" class="custom-control-input" id="customCheck1">
                    <label class="custom-control-label" for="customCheck1">Remember password</label>
                  </div>

                  <div v-if="checkWindowNotification" class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" v-model="textEnabled" class="custom-control-input" id="inputEnableText">
                    <label class="custom-control-label"  for="inputEnableText">Enable Text Notifications</label>
                  </div>

                  <button
                    class="btn btn-lg submit-profile-btn btn-block text-uppercase"
                    type="submit"
                  >Update Profile</button>
                  <hr class="my-4">
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "profile",
  computed: {
    
  },
  data: function() {
    return {
      file: '',
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      picture_ref: null,
      textEnabled: false
    }
  },
  created: function() {
    this.fillPage();
  },
  watch: {
    phoneNumber: function() {
      this.phoneNumber = this.phoneNumber.split('').filter(char => char.match(/[0-9]/g));
      if (this.phoneNumber.length > 9){
        this.phoneNumber.splice(0,0,'(');
        this.phoneNumber.splice(4,0,')');
        this.phoneNumber.splice(5,0,' ');
        this.phoneNumber.splice(9,0,'-');
      }
      this.phoneNumber = this.phoneNumber.join('').slice(0,14);
    }
  },
  computed: {
    checkWindowNotification: function() {
      if('Notification' in window)
        return false
      else 
        return true
        
    }
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.picture.files[0];
    },
    fillPage: function() {
      let id = this.$route.params.id
      axios.get(`/api/user/${id}`).then(res => {
        console.log(res)
        this.name = res.data.user_name;
        this.email = res.data.email;
        this.phoneNumber = res.data.phone_number;
        this.picture_ref = res.data.picture_ref;
        this.textEnabled = res.data.text_enabled;
    })
    },
    updateProfile: function() {
      let formData = new FormData();
      formData.append('picture',this.file)
      formData.append('user_name',this.name)
      formData.append('email',this.email)
      formData.append('phone_number',this.phoneNumber)
      formData.append('picture_ref',this.picture_ref)
      formData.append('text_enabled', this.text_enabled)
      let headers = {headers: { 'content-type': 'multipart/form-data' } };
      axios.put(`/api/user/${this.$route.params.id}`,formData,headers).then(res => {
      this.fillPage()
      console.log(res)})
    },

    
  }
};
</script>
<style>

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  margin: auto;
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

.tooltip {
  position: relative;
  display: inline-block;
  width: 3em;
  height: 3em;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.fileUploadWrapper {
  width: 3em;
  transform: scale(3);
  opacity: 0;
  margin: auto;
}
.img-wrapper {
  padding: 1em;
  height: 10em;
}
#profileThumbnail {
  height: 80%;
  width: 80%;
  max-width: 8em;
  margin: auto;
  border-radius: 1em;
}

.auto {
  margin: auto
}
/* .profile-bg {
  background: #00a799;
  background: linear-gradient(to right, #00a799, #b7e3e4);
  height: 100vh;
} */
section.profile {
  background: lightgrey;
  /* height: 100vh; */
  background: linear-gradient(to right, #00a799, #b7e3e4);
}

.mg-top {
  margin-top: 2em;
}

.profile .card {
  border: none;
  border-radius: .3rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.profile .btn {
 font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}/* may remove*/

:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.form-signin .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}


.submit-profile-btn {
  background: #ff585b;
  color: white;
  border-radius: 3em
}


.submit-profile-btn:hover {
  background: #ff585b;
  color: black;
}

/* Hover Effects on Card */

@media (min-width: 992px) {
  .profile .card:hover {
    margin-top: -.25rem;
    margin-bottom: .25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }
  .profile .card:hover {
    opacity: 1;
  }
}
</style>
