<template>
  <div class="profile">
   <section class="profile py-5 ">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mg-top auto"  >
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
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
                    
                    <input
                      type="file"
                      ref="picture"
                      accept="*/image"
                      v-on:change="handleFileUpload()"
                      id="inputPicture"
                      class="form-control"
                      autocomplete="on"
                    >
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

                  <div class="custom-control custom-checkbox mb-3">
                    <input type="checkbox" v-model="textEnabled" class="custom-control-input" id="inputEnableText">
                    <label class="custom-control-label"  for="inputEnableText">Enable Text Notifications</label>
                  </div>

                  <button
                    class="btn btn-lg sign-in btn-block text-uppercase"
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
      suggestText: false,
      textEnabled: false

    }
  },
  created: function() {
    // this.checkWindowNotification();

    let id = this.$route.params.id
    axios.get(`/api/user/${id}`).then(res => {
      console.log(res)
      this.name = res.data.user_name;
      this.email = res.data.email;
      this.phoneNumber = res.data.phone_number;
      this.picture_ref = res.data.picture_ref;
      this.textEnabled = res.data.text_enabled;
    })
    // axios.get(`/api/user/${id}/image`).then(res => {
    //   console.log(res)
    //   this.$refs.picture.file = res.data
      // })
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
      if(!'Notification' in window)
        return false
      else 
        return true
        
    }
  },
  methods: {
    handleFileUpload: function() {
      this.file = this.$refs.picture.files[0];
      console.log(this.file);
    },
    updateProfile: function() {
      console.log(this.file)
      console.log('file')
      let formData = new FormData();
      formData.append('picture',this.file)
      formData.append('user_name',this.name)
      formData.append('email',this.email)
      formData.append('phone_number',this.phoneNumber)
      formData.append('picture_ref',this.picture_ref)
      formData.append('text_enabled, this.text_enabled')

      
      let headers = {headers: { 'content-type': 'multipart/form-data' } };
      axios.put(`/api/user/${this.$route.params.id}`,formData,headers).then(res => console.log(res))
    },

    
  }
};
</script>
<style>

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
  /* background: linear-gradient(to right, #0062E6, #33AEFF) */
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

.profile hr {
  margin: 1.5rem 0;
}

.profile .group {
  font-size: 3rem;
  margin: 0;
}

.profile .text-muted {
  opacity: 0.7;
}

.profile .btn {
  font-size: 80%;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 10px;
  opacity: 0.7;
  transition: all 0.2s;
}

.card-title {
  font-size: x-large;
}

.submit-profile-btn {
  background:#00a799;
  color: white;
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

  .submit-profile-btn:hover {
    opacity: 1;
    color: white;
  }
}
</style>
