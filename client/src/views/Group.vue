<template>
  <div class="group">
    <h1>This is the group page</h1>
  </div>
</template>
<script>
export default {
  name: "group",
  data: function() {
    return {
      id: null,
      name: null,
      groupInfo: null
    }
  },
  created: function() {
    this.id = this.$route.params.id;
    this.name = this.$route.params.name;
    
    axios.get(`api/group/${this.id}/${this.name}`).then(
      (response) => {
      this.groupInfo = response.data;
      }
    );
  },
  methods: {

  }
};
</script>