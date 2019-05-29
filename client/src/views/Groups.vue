<template>
  <div class="groups">
    <section class="groups py-5 groups-bg">
      <div class="container">
        <form @submit.prevent="setStatus()">
          <div class="">
            <label id="statusFormLabel" class="btn-block" for="timeaway">Set Status</label>
            <label id="statusFormLabel" class="btn-block" for="timeaway">Groups Included</label>
            <div v-for="group in groupsArray" :key="group.id">
              <label id="statusFormLabel" class="btn-block" for="timeaway">{{group.name}}</label>
              <input  v-model="group.connect" type="checkbox"   id="connectBox">
            </div>
            <input type="number" v-model="range" id="timeaway" >
            <input class="slider btn-block" type="range" min="0" max="240" step="15" value="0" id="away" v-model="range" placeholder="Time Available"  autocomplete="off">
            <button type="submit"  class="btn view-groups-btn w-control add-btn btn-block text-uppercase">Set</button>
          </div>
        </form>
        <form @submit.prevent="addGroup()">
          <div class="">
            <label id="createFormLabel" class="btn-block" for="inputGroupName">Create Group</label>
            <input type="text" id="inputGroupName" v-model="input" placeholder="Group Name" class="round" autocomplete="off">
            <button type="submit"  class="btn view-groups-btn w-control add-btn btn-block text-uppercase">Add</button>
          </div>
        </form>
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
      groupsArray: [],
      input: '',
      range: 0,
      status: false,

    }
  },
  computed: {

  },
  created: function() {
    this.fillPage();
  },
  methods: {
    fillPage: function() {
      let id = this.$route.params.id
      console.log('route id: ',id)
      axios.get(`api/groups/${id}`).then(
        (response) => {
          this.groupsArray = response.data;
          console.table(this.groupsArray)
          this.groupsArray.map(group => group['connect'] = false)
          console.table(this.groupsArray)
        }
      );
    },
    checkOutGroup: function(i){
      let groupData = this.groupsArray[i];
      this.$router.push({name: 'group', params: { grpid: groupData.id, name: groupData.name , uid: this.$route.params.id} })
    },
    addGroup: function() {
      let body = {groupName: this.input}
      axios.post(`/api/group/${this.$route.params.id}`,body).then(res => {
        if(res.status == 200)
        console.log(res)
        this.input = ''
        this.fillPage();
        })
    },
    setStatus: function() {
      var socket = io();
      let groupIdsAndNamesToNotify = this.groupsArray.filter(group => group.connect).map(group => {return {id: group.id, name: group.name}});
      console.log(groupIdsAndNamesToNotify);
      let message = `person available for ${this.range} minutes`
      // socket.on('connect', function() {

        groupIdsAndNamesToNotify.forEach(chanel => 
        socket.emit('room', {chanel: chanel.id, name: chanel.name, message: message }))
        // Connected, let's sign-up for to receive messages for this room
       
       
      // });

      socket.on('message', function(data) {
        console.log('Incoming message:', data);
      });

    }
  }
}
</script>
<style>
.slider {
  width: 10em;
  margin: auto;
}

#createFormLabel {
  font: 1.5em bold;
}

.w-control {
  width:  10em;
  margin: auto;
  line-height: 1em;
  box-shadow:0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
  
}

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