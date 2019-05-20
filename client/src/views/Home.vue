<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="msg.greeting"/>
    <input v-model="range" type="range">
    <div>{{range}}</div>

  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import {notify} from '@/services/notify.js'
import axios from 'axios';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      range: 0,
      msg: {

      },
      notification: "Steven Wright for the next 45 minutes"
    }
  },
  created: function() {
    this.notifyMe();
    axios.get('api/test').then(
      (response) => {
        console.log(response.data);
      this.msg = response.data;
      }
    );
  },
  methods: {
  notifyMe: function() {

    notify(this.notification);
    
    }
  }
}
</script>
