<template>
  <div class="group">
    <section class="group py-5">
      <div class="container"> 
        <h1>{{name}}</h1>
        <div class="row">
          <div v-for="(member, i) in groupInfo" :key="i"  class="col-md-4 mg-top memb float in-l">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <div class="row no-gutters justify-content-md-center">
                  <div class="col-lg-2 center">
                    <img v-if="member.picture_ref" v-bind:src="'/images/upload_images/' + member.picture_ref" id="profileThumbnail"/>
                  </div>
                  <div class="col-lg-8 title-container">
                    <h5 class="card-title text-center">{{member.user_name}}</h5>
                  </div>
                  <div class="col-lg-2"></div>
                </div>
                <hr>
                <p :style="member.status ? 'color: green' : 'color: red; opacity: .5'">{{ member.status ? 'available to talk' : 'not available'}}</p>
                <p><a :style="member.status ? '' : 'color: grey; opacity: .5'" :href='"tel:+1"+formattedTelNumber(i)'> {{member.phone_number}}</a></p>
                <a @click="checkOutMember(i)" class="btn view-member-btn btn-block text-uppercase">View Member Info</a>
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
  name: "group",
  
  data: function() {
    return {
      name: null,
      groupInfo: null
    }
  },
  computed: {
   
   
  }, 
  created: function() {
    this.name = this.$route.params.name;
    let id = this.$route.params.id;
    let uid = this.$route.params.uid
  
    axios.get(`api/group/${uid}/${id}`).then(
      (response) => {
      this.groupInfo = response.data;
      console.table(this.groupInfo)
      }
    );
  },
  methods: {
    
  
   
    formattedTelNumber: function(i) {
      return this.groupInfo[i].phone_number.split('').filter(char => char.match(/[0-9]/g)).join('')
    },
  }
};
</script>
<style scoped>
.memb {
  max-width: 70vw;
  min-width: fit-content;
}

.title-containter {
  width: fit-content;
}

h5 {
  white-space: nowrap;

}

#profileThumbnail {
  height: 100%;
  width: 100%;
  max-width: 10em;
  margin: auto;
  border-radius: 10em;
}

section.group {
  background: lightgrey;
  background-size:contain;
  min-height: 100vh;
  background: linear-gradient(to right, #00a799, #b7e3e4);
}

.in-l{
  display: inline
}

.mg-top {
  margin-top: 2em;
}

.group .card {
  border: none;
  border-radius: .3rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.group hr {
  margin: 1.5rem 0;
}

.group .member {
  font-size: 3rem;
  margin: 0;
}

.group .text-muted {
  opacity: 0.7;
}

.group .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.card-title {
  font-size: x-large;
}

.view-member-btn {
 background: #ff585b;
  color: white;
}

.view-member-btn:hover {
  background: #ff585b;
  color: black;
}

/* Hover Effects on Card */

@media (min-width: 992px) {
  .group .card:hover {
    margin-top: -.25rem;
    margin-bottom: .25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }
  .group .card:hover {
    opacity: 1;
  }

  .view-member-btn:hover {
    opacity: 1;
    color: white;
  }
}
@media only screen and (max-width: 768px){
  .memb {
    margin: auto;
  }
  h5 {
    white-space: initial;
  }
  
}
</style>