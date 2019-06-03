<template>
  <div id="app">
    <div id="nav">
      <navbar 
      @loggedOut="logMeInOrOut" 
      @clearStatus="clearStatus"
      v-bind:userData="userData" 
      v-bind:loggedIn="loggedIn" ></navbar>
    </div>
    <router-view 
    @loggedIn="logMeInOrOut"
    @getGroups="getGroups"
    @userData="getUserData"
    @clearStatus="clearStatus"
    v-bind:groupsArray="groupsArray" 
    v-bind:userData="userData"
    v-bind:socket="socket" 
    v-bind:formattedTelNumber="formattedTelNumber"
  

    />
  </div>
</template>

<script>
import navbar from "./components/navbar.vue";
import axios from "axios";
import moment from "moment";
import io from "socket.io-client";
import { notify } from "./services/notify.js";

export default {
  name: "app",
  components: {
    navbar,
  },
  data: function() {
    return {
      loggedIn: false,
      userData: null,
      groupsArray: null,
      timer: '',
      socket: io()
    }
  },
  watch: {
    loggedIn: function() {
      this.getGroups();
      if(this.userData.minutes){
        // if(this.userData.minutes){
          let timeDiff = moment(this.userData.minutes, 'h:mm A').unix() - moment().unix() 
            if(timeDiff > 1){
              console.log('setting timer')
              this.UnixTimerSetting = timeDiff
              this.setTimer(timeDiff);
              
            }
            else
              this.clearStatus()
        // }
      }
    },
  },
  created: function(){
    this.getUserData()
    this.listenForUpdates()
  },
  methods: {
    logMeInOrOut: function(object) {
      console.log('log in ',object)
      this.loggedIn = object.loggedIn
      this.userData = object.user
      if(object.loggedIn)
        this.$router.push({name: 'groups', params: { id: this.userData.id }})
      else
        this.$router.push({name: 'landing'})
    },
    getGroups: function() {
      //get groups Array to populate page
      let id = this.userData.id; /// id from user query
      axios.get(`api/groups/${id}`).then(response => {
        this.groupsArray = response.data;
        console.table(this.groupsArray);
      });
    },
    getUserData: function() {
      axios.get('/loginStatus').then(res => {
      this.userData = res.data || null
      this.loggedIn = res.data ? true : false
      if(res.data){
        console.log('get groups')
        this.getGroups();
      }
      else
        this.$router.push({ name: 'landing'})
      })
    },
     setTimer: function(seconds) {
      if(!this.timer)
        this.timer = setTimeout(this.clearStatus, seconds * 1000);
    },
    listenForUpdates: function() {
      console.log('listening for updates');
      let self = this;
      this.socket.on("update", function(groups) {
        console.log('updating')
        let flag = false;
        self.groupsArray.forEach(group => {
          if (groups.indexOf(group.id) > -1)
            flag = true;
        })
        if(flag)
          self.getGroups();
      })
    },
    clearStatus: function() {
      console.log('status clear')
      clearTimeout(this.timer);
      this.timer = ""
      this.userData.minutes = "";
      axios.put(`/api/minutes/${this.userData.id}`,{minutes: this.userData.minutes}).then(res => console.log(res))
      if(this.groupsArray){
        this.groupsArray.forEach(chanel =>{
          if(chanel.status)
            this.socket.emit("leave", {
              chanel: chanel.id,
              name: chanel.name
            });
          chanel.status = false;
        });
        this.socket.removeListener('message');
        let uid = this.$route.params.id;
        console.log('clear ', this.groupsArray)
        axios.put(`/api/status/${uid}`,this.groupsArray ).then(res => {
        });
      }
    },
    reJoin: function() {
      this.groupsArray.forEach(chanel =>{
        if(chanel.status)
          this.socket.emit("rejoin", {
            chanel: chanel.id,
            name: chanel.name
          });
        });
      let self = this;
      this.socket.on("message", function(message) {
          notify(message,self.userData.text_enabled,self.formattedTelNumber(self.userData.phone_number))
      });
      
      
    },
   formattedTelNumber: function(number) {
      return `+1${number.split('').filter(char => char.match(/[0-9]/g)).join('')}`
    },
  }
};

</script>

<style lang="scss">
#app { 
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
