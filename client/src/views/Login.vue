<template>
  <div class="login">
    <h1>This is a login page</h1>
  <button @click="logMeIn" >log me in</button>
  </div>

</template>
<script>
export default {
  name: "login",
  methods: {
    logMeIn: function() {
      this.$emit('loggingIn', true);
    }
  }
};
</script>