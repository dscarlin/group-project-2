<template>
  <div class="group">
    <section class="group py-5">
      <div class="container"> 
        <h1>{{name}}</h1>
        <div class="row">
        
                
                <div v-for="(member,i) in groupInfo" :key="member.id" class="col-md-4 mg-top float in-l">
                  <div class="card mb-5 mb-lg-0">
                    <div class="card-body">
                      <h5 class="card-title text-center">{{member.user_name}}</h5>
                      <hr>
                      <p :style="color(i)">{{ member.status ? 'available to talk' : 'not available'}}</p>
                      <p v-if="member.status">{{member.phone_number}}</p>
                      <p v-else style="color: grey; opacity: .5">{{member.phone_number}}</p>
                      <a @click="checkOutMember(i)" class="btn view-groups-btn btn-block text-uppercase">View Member Info</a>
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
      id: null,
      name: null,
      groupInfo: null
    }
  },
  computed: {
    
  }, 
  created: function() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
  
    axios.get(`api/group/${this.id}`).then(
      (response) => {
      this.groupInfo = response.data;
      console.table(this.groupInfo)
      }
    );
  },
  methods: {
  color: function(i) {
        if (this.groupInfo[i].status)
          return 'color: green'
        else 
          return 'color: red; opacity: .5'
      }
  }
};
</script>
<style>
section.group {
  background: lightgrey;
  height: 100vh;
  /* background: linear-gradient(to right, #0062E6, #33AEFF); */
}

.in-l{
  display: inline
}
.mg-top {
  margin-top: 2em;
}
.float{
  float:left;
  height: flex;
  
  }

</style>