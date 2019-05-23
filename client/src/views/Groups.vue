<template>
  <div class="groups">
    <section class="groups py-5">
      <div v-for="(group,i) in groupsArray" :key="i"  class="col-md-4">
        <div class="row">
          <div class="col-lg-4">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <h5 class="card-title text-center">Basketball Group</h5>
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
    axios.get(`api/groups/${id}`).then(
      (response) => {
      this.groupsArray = response.data;
      }
    );
  },
  methods: {
    checkOutGroup: function(i){
      let groupData = this.groupsArray[i]
    }
  }
}
</script>
<style>
section.groups {
  background: lightgrey;
  height: 100vh;
  /* background: linear-gradient(to right, #0062E6, #33AEFF); */
}

.groups .card {
  border: none;
  border-radius: .3rem;
  transition: all 0.2s;
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
  letter-spacing: .1rem;
  font-weight: bold;
  padding: 10px;
  opacity: 0.7;
  transition: all 0.2s;
}

.card-title {
  font-size: x-large;
}

.view-groups-btn {
  background:#00a799;
  color: white;
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

  .view-groups-btn:hover {
    opacity: 1;
    color: white;
  }
}
</style>