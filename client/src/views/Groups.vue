<template>
  <div class="groups">
    <div class="container">
      <!-- set status link -->
      <p @click="displayTime" class="status-link" data-toggle="modal" data-target="#statusModal">📅 Set Status</p>
      <div>
        <div
          class="modal fade"
          id="statusModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="statusModalLabel"
          aria-hidden="true"
          >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="statusModalLabel">Set Status</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <!-- set status form -->
              <form >
                <div class>
                  <label id="statusFormLabel" class="btn-block" for="timeaway">Available to talk until:</label>
                  <!-- <input type="text" class="btn-block w10" disabled v-model="input" id="timeaway"> -->
                  <div v-if="!userData.minutes">
                    <input type="text" class="text-center" v-model="input" id="timeaway" disabled>
                    <input
                      class="slider btn-block"
                      type="range"
                      min="0"
                      max="400"
                      step="15"
                      value="0"
                      id="away"
                      v-model="range"
                      placeholder="Time Available"
                      autocomplete="off"
                    >
                  </div>
                  <input v-else type="text" class="text-center" v-model="userData.minutes" id="timeaway" disabled>

                  <label
                    id="statusFormLabel" 
                    class="btn-block modal-body"
                    for="timeaway"
                  >Select Groups:</label>
                  <div style=" max-width: 5em; vertical-align: text-top; display: inline-block; margin: 0 1em 1em;" v-for="group in groupsArray" :key="group.id">
                    <input v-model="group.status" type="checkbox"  id="connectBox">
                    <label id="statusFormLabel" class="btn-block" for="timeaway">{{group.name}}</label>
                  </div>
                </div>
                <button v-if="!userData.minutes"
                  @click.prevent="setStatus"
                  type="submit"
                  class="btn view-groups-btn w-control add-btn btn-block text-uppercase"
                  >Set</button>
                <button v-else class="btn view-groups-btn w-control add-btn btn-block text-uppercase" @click.prevent="clearStatus">clear status</button>
              </form>
              <!-- <label id="statusFormLabel" class="btn-block modal-body" for="timeaway">Select Groups:</label>
              <div v-for="group in groupsArray" :key="group.id">
                <label id="statusFormLabel" class="btn-block" for="timeaway">{{group.name}}</label>
                <input v-model="group.connect" type="checkbox" id="connectBox">
                </div>-->
                <!-- <div class="modal-footer">
                <button
                  type="submit"
                  class="btn view-groups-btn w-control add-btn btn-block text-uppercase"
                >Set</button>
                </div>-->
            </div>
          </div>
        </div>
      </div>
        <!-- create group link -->
        <p
          class="create-group-link"
          data-toggle="modal"
          data-target="#createGroupModal"
          >📁 Create Group</p>
        <div>
          <div
            class="modal fade"
            id="createGroupModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="createGroupModalLabel"
            aria-hidden="true"
            >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="createGroupLabel">Create Group</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <!-- add group form -->
                <form @submit.prevent="addGroup">
                  <div class>
                    <label
                      id="createGroupFormLabel"
                      class="btn-block"
                      for="inputGroupName"
                    >Create Group</label>
                    <input
                      type="text"
                      id="inputGroupName"
                      v-model="groupInput"
                      placeholder="Group Name"
                      class="round"
                      autocomplete="off"
                    >
                  </div>
                  <button
                    class="btn view-groups-btn w-control add-btn btn-block text-uppercase"
                    type="submit"
                  >Add</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      <!-- </div> -->
      <div class="row">

        <div class="col-lg-4 mg-top" v-for="(group,i) in groupsArray" :key="i">
          <div class="card groups-card mb-5 mb-lg-0 mx-auto">
            <div class="card-body">
              <div class="title-container">
                <h5 class="card-title text-center">{{group.name}}</h5>
              </div>
              <hr>
              <p>{{group.memberStatusArray.length}} Members 👨‍👨‍👧‍👧</p>
              <p>{{group.memberStatusArray.filter(status => status == true).length}} Members Available to Chat 👁️‍🗨️</p>
              <a
                @click="checkOutGroup(i)"
                class="btn view-groups-btn btn-block text-uppercase"
              >View Group</a>
            </div>
          </div>
        </div>
      
      </div> <!-- end row -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import { notify } from "../services/notify.js";

export default {
  name: "groups",
  components: {},
  props: {
    groupsArray: Array,
    userData: Object,
    socket: Object,
    formattedTelNumber: Function
  },
  data: function() {
    return {
      input: "",
      range: 0,
      groupInput: '',
    };
  },
  watch: {
    range: function() {
      this.displayTime();
    },
    userData: function() {
      this.$emit('getGroups');

    }
  },
  computed: {},
  created: function() {
    
  },
  methods: {
    checkOutGroup: function(i) {
      //maybe substitute i for group
      let groupData = this.groupsArray[i];
      this.$router.push({
        name: "group",
        params: {
          grpid: groupData.id,
          name: groupData.name,
          uid: this.userData.id
        }
      });
    },
    displayTime: function(){
      let secAdj = (15 - moment().format('m') % 15) * 60;
      let sec = this.range * 60 + secAdj;
      let time = moment((moment().unix() + sec),'X').format('LT')
      this.input = time
    },
    addGroup: function() {
      let body = { groupName: this.groupInput };
      axios.post(`/api/group/${this.userData.id}`, body).then(res => {
        if (res.status == 200) console.log(res);
        this.groupInput = "";
        this.$emit('getGroups')
      });
    },
    setStatus: function() {
      let uid = this.userData.id
      this.userData.minutes = this.input
      axios.put(`/api/minutes/${uid}`,{minutes: this.input}).then(res => {
        console.log('minutes saved');
        this.$emit('userData')
      })
      axios.put(`/api/status/${uid}`,this.groupsArray ).then(res => {
        console.log('status saved');
        this.$emit('getGroups')
        this.socket.emit('updateGroups', this.groupsArray.map(group => group.id))
        let message = {
          body: `${res.data.user_name} is avaliable until ${this.input} at ${res.data.phone_number}`,
        };

        let self = this
        this.groupsArray.forEach(chanel =>{
          if(chanel.status)
            this.socket.emit("join", {
              chanel: chanel.id,
              name: chanel.name,
              message: message,
              uid: res.data.id
            })
        });

        this.socket.on("message", function(message) {
          notify(message,self.userData.text_enabled,self.formattedTelNumber(self.userData.phone_number))
        });
      })
    },
    clearStatus: function() {
      this.range = 0
      this.socket.emit('updateGroups', this.groupsArray.map(group => group.id))
      this.$emit('clearStatus')
      
    },
   

    
    
  }
};
</script>
<style>
#statusFormLabel {
  height: 3em;
  text-overflow: ellipsis;
  overflow: hidden;
}

form {
  margin: 10px;
}

h5 {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.groups-card {
  width: 18em;
  max-width: 90vw;
  /* height: 20em; */
  display: block;
  /* position: relative; */
}

#timeAway {
  text-align: center;
}

.slider {
  width: 40%;
  
  margin: 0 auto 0;
}

#createFormLabel {
  font: 1.5em bold;
}

#inputGroupName {
  margin-bottom: 5px;
  text-align: center;
}

.w-control {
  width: 10em;
  margin: auto;
  line-height: 1em;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

section.groups {
  background-size: contain;
  min-height: 100vh;
  background: linear-gradient(to right, #00a799, #b7e3e4);
}
body {
  height: 100vh;
  background: linear-gradient(to right, #00a799, #b7e3e4);
}

.mg-top {
  margin-top: 2em;
}

.groups .groups-card {
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
  background: #00a799;
  color: white;
}

.view-groups-btn:hover {
  background: #00a799;
  color: black;
  cursor: pointer;
}

.status-link,
.create-group-link {
  margin-top: 15px;
  text-align: right;
  font-weight: bold;
  padding-left: 30px;
}

.status-link:hover,
.create-group-link:hover {
  cursor: pointer;
}

/* Hover Effects on Card */
@media (min-width: 992px) {
  .groups .groups-card:hover {
    margin-top: -0.25rem;
    margin-bottom: 0.25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }
  .groups .groups-card:hover {
    opacity: 1;
  }

  /* .view-groups-btn:hover {
    opacity:.70;
    color: white;
  } */
}
</style>