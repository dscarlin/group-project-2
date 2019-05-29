<template>
  <div class="groups">
    <section class="groups py-5 groups-bg">
      <div class="container">
        <div class="row">
          <div class="col-md-4 mg-top"  v-for="(group,i) in groupsArray" :key="i">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <h5 class="card-title text-center">{{group.name}}</h5>
                <hr>
                <p>{{group.memberStatusArray.length}} Members 👨‍👨‍👧‍👧</p>
                <p>{{group.memberStatusArray.filter(status => status == true).length}} Members Available to Chat 👁️‍🗨️</p>
                <a @click="checkOutGroup(i)" class="btn view-groups-btn btn-block text-uppercase">View Group</a>
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
  name: 'groups',
  components: {
    
  },
  props: {

  },
  data: function() {
    return {
     groupsArray: []

    }
  },
  computed: {

  },
  created: function() {
    let id = this.$route.params.id
    console.log('route id: ',id)
    axios.get(`api/groups/${id}`).then(
      (response) => {
      this.groupsArray = response.data;
      console.table(this.groupsArray)
      }
    );
  },
  methods: {
    checkOutGroup: function(i){
      let groupData = this.groupsArray[i];
      this.$router.push({name: 'group', params: { grpid: groupData.id, name: groupData.name , uid: this.$route.params.id} })
    }
  }
}
</script>
<style>

section.groups {
  background-size: contain;
  min-height: 100vh;
  background: linear-gradient(to right, #00a799, #b7e3e4);
}

.mg-top {
  margin-top: 2em;
}

.groups .card {
  border: none;
  border-radius: 1rem;
  transition: all 0.2s;
  margin: 1em;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.groups hr {
  margin: 1.5rem 0;
}




.groups .group {
  font-size: 3rem;
  margin: 0;
}

.groups .text-muted {
  opacity: 0.7;
}

.groups .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s; 
}

.card-title {
  font-size: xx-large;
}

.view-groups-btn {
  background:#00a799;
  color: white;
}
.view-groups-btn:hover {
  background:#00a799;
  color: black;
}
/* Hover Effects on Card */

@media (min-width: 992px) {
  .groups .card:hover {
    margin-top: -.25rem;
    margin-bottom: .25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }
  .groups .card:hover {
    opacity: 1;
  }

  /* .view-groups-btn:hover {
    opacity:.70;
    color: white;
  } */
}
</style>