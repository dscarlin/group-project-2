<template>
  <div class="member">
    <section class="member py-5">
      <div class="container"> 
        <!-- <h1>{{name}}</h1> -->
        <div class="row">
          <div class="col-lg-12 mg-top memb float in-l">
            <div class="card mb-5 mb-lg-0 mem-profile">
              <div class="card-body">
                <div class="row no-gutters justify-content-md-center">
                    <img id="profileImage" v-if="picture_ref" v-bind:src="picture_ref"/>
                  <div class="col-lg-12 title-container">
                    <h1 class="card-title h1 text-center">{{name}}</h1>
                  </div>
                </div>
                <hr>
                <p :style="status ? 'color: green' : 'color: red; opacity: .5'">{{ status ? 'available to talk' : 'not available'}}</p>
                <p><a :style="status ? '' : 'color: grey; opacity: .5'" :href="'tel:'+formattedTelNumber(phoneNumber)"> {{phoneNumber}}</a></p>
                <p><a :style="status ? '' : 'opacity: .7'" :href='"mailto:"+ email'> {{email}}</a></p>
                <hr>
                <a @click="remove()" class="btn remove-member-btn btn-block text-uppercase">Remove Member</a>
              </div>
            </div>
          </div>   
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: "member",
  props: {
    socket: Object,
    formattedTelNumber: Function
  },
  data: function() {
    return {
      name: '',
      picture_ref: '',
      phoneNumber: '',
      email: '',
      status: '',

    }
  },
  created: function(){
    this.fillPage();
    this.listenForUpdates();
    
  },
  methods: {
    fillPage: function() {
      let id = this.$route.params.mid;
      let grpid = this.$route.params.grpid;

      axios.get(`/api/user/status/${id}/${grpid}`).then(res => {
        console.log(res)
        this.name = res.data.user_name;
        this.email = res.data.email;
        this.phoneNumber = res.data.phone_number;
        this.picture_ref = res.data.picture_ref;
        this.status = res.data.UserGroups[0].status;
        this.date = res.data.createdAt  
      })
    },
    remove: function() {
      let groupId = this.$route.params.grpid;
      let userId = this.$route.params.mid;
      axios.delete(`/api/user/group/${userId}/${groupId}`).then(res => {
        if(res){
          this.$emit('getGroups')
          this.$router.go(-1)
        }
      });
    },
     listenForUpdates: function() {
      let self = this;
      this.socket.on("update", function(groups) {
        console.log('updating');
        if(groups.indexOf(self.$route.params.grpid) > -1)
          self.fillPage();
      })
      
    }
  }

};
</script>

<style>




h5 {
  white-space: nowrap;

}

#profileImage {
  max-height: 10em ;
  /* width: 100%; */
  max-width: 4  em;
  margin: 0 auto 2em;
  border-radius: 10em;
}

section.member {
  /* background: lightgrey; */
  background-size:contain;
  min-height: 100vh;
  background: linear-gradient(to right,  #00a799, #b7e3e4);
}



.member .card {
  border: none;
  border-radius: 1rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  max-width: 30em;
  margin: auto;
}

.member hr {
  margin: 1.5rem 0;
}

.member .btn {
  font-size: 80%;
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 10px;
  opacity: 0.7;
  transition: all 0.2s;
}

.member {
  font-size: 1.25em
}

.h1{
  font-size: 2em!important;
  font-weight: bolder!important;
}

.remove-member-btn {
  background: #ff585b;
  color: white!important;
  width: fit-content;
  margin: auto;
}

.member .text-muted {
  opacity: 0.7;
}

@media only screen and (max-width: 768px){
  .memb {
    margin: auto;
  }

  .card {

  font-size: small
  }
  h5 {
    white-space: initial;
  }
}

</style>

