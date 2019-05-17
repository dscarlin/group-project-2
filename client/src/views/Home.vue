<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="msg.greeting"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      msg: {

      }
    }
  },
  created: function() {
    axios.get('api/test').then(
      (response) => {
      console.log(response.data);
      this.msg = response.data;
      }
    );
  }
}
</script>
