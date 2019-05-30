<template>
  <div class="groups">
    <div class="container">
      <!-- set status link -->
      <p class="status-link" data-toggle="modal" data-target="#statusModal">📅 Set Status</p>
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
              <form @submit.prevent="setStatus()">
                <div class>
                  <label id="statusFormLabel" class="btn-block" for="timeaway">Set Status</label>
                  <input type="number" v-model="range" id="timeaway">
                  <input
                    class="slider btn-block"
                    type="range"
                    min="0"
                    max="240"
                    step="15"
                    value="0"
                    id="away"
                    v-model="range"
                    placeholder="Time Available"
                    autocomplete="off"
                  >
                  <label
                    id="statusFormLabel"
                    class="btn-block modal-body"
                    for="timeaway"
                  >Select Groups:</label>
                  <div v-for="group in groupsArray" :key="group.id">
                    <label id="statusFormLabel" class="btn-block" for="timeaway">{{group.name}}</label>
                    <input v-model="group.connect" type="checkbox" id="connectBox">
                  </div>
                </div>
                <button
                  type="submit"
                  class="btn view-groups-btn w-control add-btn btn-block text-uppercase"
                >Set</button>
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
              </div> -->
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
              <form @submit.prevent="addGroup()">
                <div class>
                  <label
                    id="createGroupFormLabel"
                    class="btn-block"
                    for="inputGroupName"
                  >Create Group</label>
                  <input
                    type="text"
                    id="inputGroupName"
                    v-model="input"
                    placeholder="Group Name"
                    class="round"
                    autocomplete="off"
                  >
                </div>
                <button
                  type="submit"
                  class="btn view-groups-btn w-control add-btn btn-block text-uppercase"
                >Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-4 mg-top" v-for="(group,i) in groupsArray" :key="i">
          <div class="card mb-5 mb-lg-0">
            <div class="card-body">
              <h5 class="card-title text-center">{{group.name}}</h5>
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
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "groups",
  components: {},
  props: {},
  data: function() {
    return {
      groupsArray: [],
      input: "",
      range: 0,
      status: false
    };
  },
  computed: {},
  created: function() {
    this.fillPage();
  },
  methods: {
    fillPage: function() {
      let id = this.$route.params.id;
      console.log("route id: ", id);
      axios.get(`api/groups/${id}`).then(response => {
        this.groupsArray = response.data;
        console.table(this.groupsArray);
        this.groupsArray.map(group => (group["connect"] = false));
        console.table(this.groupsArray);
      });
    },
    checkOutGroup: function(i) {
      let groupData = this.groupsArray[i];
      this.$router.push({
        name: "group",
        params: {
          grpid: groupData.id,
          name: groupData.name,
          uid: this.$route.params.id
        }
      });
    },
    addGroup: function() {
      let body = { groupName: this.input };
      axios.post(`/api/group/${this.$route.params.id}`, body).then(res => {
        if (res.status == 200) console.log(res);
        this.input = "";
        this.fillPage();
      });
    },
    setStatus: function() {
      var socket = io();
      let groupIdsAndNamesToNotify = this.groupsArray
        .filter(group => group.connect)
        .map(group => {
          return { id: group.id, name: group.name };
        });
      console.log(groupIdsAndNamesToNotify);
      let message = `person available for ${this.range} minutes`;
      // socket.on('connect', function() {

      groupIdsAndNamesToNotify.forEach(chanel =>
        socket.emit("room", {
          chanel: chanel.id,
          name: chanel.name,
          message: message
        })
      );
      // Connected, let's sign-up for to receive messages for this room

      // });

      socket.on("message", function(data) {
        console.log("Incoming message:", data);
      });
    }
  }
};
</script>
<style>
.slider {
  width: 10em;
  margin: auto;
}

#createFormLabel {
  font: 1.5em bold;
}

#inputGroupName {
  margin-bottom: 5px;
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
  margin-top: 30px;
}

.status-link,
.create-group-link:hover {
  cursor: pointer;
}

/* Hover Effects on Card */

@media (min-width: 992px) {
  .groups .card:hover {
    margin-top: -0.25rem;
    margin-bottom: 0.25rem;
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