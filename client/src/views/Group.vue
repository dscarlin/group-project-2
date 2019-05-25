<template>
  <div class="group">
    <section class="group py-5">
      <div class="container"> 
        <h1>{{name}}</h1>
        <div class="row">
          <div v-for="(member, i) in groupInfo" :key="member.id" class="col-md-4 mg-top float in-l">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <h5 class="card-title text-center">{{member.user_name}}</h5>
                <hr>
                <p :style="statusColor(i)">{{ member.status ? 'available to talk' : 'not available'}}</p>
                <p ><a :style="phoneNumberColor(i)" :href='"tel:+1"+formattedTelNumber(i)'> {{member.phone_number}}</a></p>
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
    statusColor: function(i) {
        if (this.groupInfo[i].status)
          return 'color: green'
        else 
          return 'color: red; opacity: .5'
    },
  
    phoneNumberColor: function(i) {
        if (this.groupInfo[i].status)
          return ""
        else
          return "color: grey; opacity: .5"
    },
    formattedTelNumber: function(i) {
      return this.groupInfo[i].phone_number.split('').filter(char => char.match(/[0-9]/g)).join('')
    },
  }
};
</script>
<style scoped>
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

/* .float{
  float:left;

} */

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
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 10px;
  opacity: 0.7;
  transition: all 0.2s;
}

.card-title {
  font-size: x-large;
}

.view-member-btn {
  background:#00a799;
  color: white;
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
</style>