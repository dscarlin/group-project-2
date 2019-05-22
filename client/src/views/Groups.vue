<template>
  <div class="groups">
  <div>{{msg}}</div>
   
  </div>
</template>

<script>
// @ is an alias to /src

import axios from 'axios';

export default {
  name: 'groups',
  components: {
    
  },
  props: {

  },
  data: function() {
    return {
     msg: ''

    }
  },
  created: function() {
    let id = this.$route.params.id
    console.log('params id: ',id)
    axios.get(`api/groups/:${id}`).then(
      (response) => {
      console.log(response.data);
      this.msg = response.data.request;
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
