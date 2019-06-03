<template>
  <div class="group">
    <section class="group py-5">
      <div class="container"> 
        <h1>{{name}}</h1>
          <form @submit.prevent="add(search)">
          <div class="">
            <label for="search" class="btn-block">Add a Member</label>
            <input type="text" id="search" v-model="search" placeholder="Search" class="round" autocomplete="off">
            
            <div id="suggest" class="round" >
              <ul style="list-style-type:none;" v-if="suggest.length < 6 && suggest.length > 0">
                <li id="select" @click="fillInput(name)" v-for="name in suggest" :key="name.id"><img v-if="name.picture_ref" v-bind:src="name.picture_ref" id="icon"/>  {{name.user_name}}</li>
              </ul>
              <ul style="list-style-type:none;" v-else-if="(suggest.length < 1) && (search.length > 0)">
                <li>NO MATCH</li>
              </ul>
            </div>
            <button type="submit"  class="btn add-member-btn add-btn text-uppercase">Add to Group</button>
          </div>
          </form>

        <div class="row">

          <div v-for="member in groupInfo" :key="member.id"  class="col-lg-4 mg-top memb float in-l">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <div class="table row no-gutters justify-content-md-center">
                  <div class="col col-lg-2 center">
                    <img v-if="member.picture_ref" v-bind:src="member.picture_ref" id="profileThumbnail"/>
                  </div>
                  <div class="col col-lg-8 title-container">
                    <h3 class="card-title text-center">{{member.user_name}}</h3>
                  </div>
                  <div class="col col-lg-2"></div>
                </div>
                <hr class= "divider">
                <p :style="member.status ? 'color: green' : 'color: red; opacity: .5'">{{ member.status ? 'available to talk' : 'not available'}}</p>
                <p><a :style="member.status ? '' : 'color: grey; opacity: .5'" :href='"tel:+1"+formattedTelNumber(member.phone_number)'> {{member.phone_number}}</a></p>
                <a @click="checkOut(member)" class="btn view-member-btn btn-block text-uppercase">View Member Info</a>
              </div>
            </div>
          </div>   
        </div>
      </div>
      <form @submit.prevent="removeGroup()">
        <div class="">
          <button type="submit"  class="btn remove add-btn text-uppercase">Remove Group</button>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "group",
  props: {
    socket: Object
  },
  watch: {
    search: function() {
      let array = this.userArray.filter(user => user.user_name.toLowerCase().includes(this.search.toLowerCase()) && this.search.length > 0)
      let levNums = []
      this.suggest = []
      array.forEach((item)=> {
        let m = 0
        item.user_name.split('').forEach((letter,i) => {
          this.search.split('').forEach((char,n) => {
            if((i < 1 && n < 1 && char.toLowerCase() == letter.toLowerCase()) || (n < 1 && /^[A-Z]/.test(letter) && char.toLowerCase() == letter.toLowerCase()) )
              m += 3
            else if (char.toLowerCase() == letter.toLowerCase()) 
              m++
          });
        })
        if(levNums.length < 1){
          levNums.push(m)
          this.suggest.push(item)
        }
        else {
          for(let i=0; i < levNums.length; i++){
            if(m > levNums[i]) {
              levNums.splice(i,0,m)
              this.suggest.splice(i,0,item)
              return
              
            }
          }
          this.suggest.push(item)
        }
      })
    }
  },
  data: function() {
    return {
      name: null,
      groupInfo: null,
      userArray: null,
      search: '',
      suggest: ''
    }
  },
  computed: {
   
   
  }, 
  created: function() {
    this.fillPage();
    this.listenForUpdates();
  },
  methods: {
    fillPage: function(){
      this.name = this.$route.params.name;
      let id = this.$route.params.grpid;
      let uid = this.$route.params.uid
    
      axios.get(`/api/group/${uid}/${id}`).then(
        (response) => {
        this.groupInfo = response.data;
        console.table(this.groupInfo)
        let excludeArray = response.data.map(member => member.id)
        excludeArray.push(parseInt(uid));
        console.log(excludeArray)
        axios.get('/api/search/users').then( 
          res => this.userArray = res.data.filter(e => excludeArray.indexOf(e.id) < 0));
        }
      );
      
    },
    checkOut: function(member) {
      this.$router.push({ name: 'member', params: { mid: member.id, grpid: this.$route.params.grpid } })
    },
    fillInput: function(selected) {
      this.search = selected.user_name
    },
   
    formattedTelNumber: function(number) {
      return number.split('').filter(char => char.match(/[0-9]/g)).join('')
    },
    add: function(member){
      let userId = this.userArray.filter(entry => entry.user_name == member)[0].id 
      let groupId = this.$route.params.grpid
      axios.post(`/api/user/${groupId}`,{userId}).then(res => {
        this.search = '';
        this.$emit('getGroups');
        this.fillPage();
      })
    },
    removeGroup: function() {
      axios.delete(`/api/group/${this.$route.params.grpid}`).then(res => {
        if(res) 
          this.$router.go(-1);
      })
    },
    listenForUpdates: function() {
      let self = this;
      this.socket.on("update", function(groups) {
        console.log('updating');
        if(groups.indexOf(self.$route.params.grpid) > -1)
          self.fillPage();
      })
      
    }
    
  }
}
</script>
<style scoped>

ul {
  padding: 0;
}

.add-member-btn {
  background-color: #ff585b;
  margin-top: 10px;
}

#icon {
  width: 1em;
  height: 1em;
}
.card {
  width: 25em;
  max-width: 90vw;
  height: 20em;

  position: relative;
}

.round {
  border-radius: .5em;
  padding: 0 1em;
  outline: none
}

li {
  margin: auto;
}

#select:hover {
  cursor: pointer;
  font-weight: bold
}

#search {
  /* margin-left: 5px; */
  text-align: center;
  width: fit-content;
  min-width: 10em;
}

#suggest {
  width: fit-content;
  margin: auto;

  }

#suggest {
  background: white;
  display: block; 
}

.memb {
  max-width: 70vw;
  min-width: fit-content;
}

.title-containter {
  width: fit-content;
}

h5 {
  white-space: nowrap;
  font-size: large!important

}

#profileThumbnail {
  height: 100%;
  width: 100%;
  max-width: 5em;
  min-width: 3em;
  margin: auto;
  border-radius: 10em;
}

section.group {
  /* background: lightgrey; */
  background-size:contain;
  min-height: 100vh;
  background: linear-gradient(to right, #00a799, #b7e3e4);
}

.in-l{
  display: inline
}

.mg-top {
  margin-top: 2em;
}

.group .card {
  border: none;
  border-radius: 1rem;
  transition: all 0.2s;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.group hr {
  margin: 1.5rem 0;
}

.group .member {
  font-size: 3rem;
  margin: 0;
}

.group .text-muted {
  opacity: 0.7;
}
.remove {
  width: 20em;
  line-height: 2em;
  background: #ff585b;
  color: white;
  border-radius: 3em;
}

.remove:hover {
  background: #ff585b;
  color: black;
}
.group .btn {
  font-size: 80%;
  letter-spacing: .1rem;
  border-radius: 5rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.divider {
  
  top: 5em;

}
.card .btn {
  position: absolute;
  bottom: 2em;
  width: calc(100% - 2.5rem);
  margin: auto;
}

.view-member-btn {
  background:#00a799;
  line-height: 3;
  color: white;
}

.view-member-btn:hover {
  cursor: pointer;
}

.table {
  height: 4em;
}

.add-btn {
  border-radius: 1em!important;
  line-height: 2;
}

/* Hover Effects on Card */

@media (min-width: 992px) {
  .group .card:hover {
    margin-top: -.25rem;
    margin-bottom: .25rem;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.3);
  }
  .group .card:hover {
    opacity: 1;
  }

  .view-member-btn:hover {
    opacity: 1;
    color: white;
  }
}
@media only screen and (max-width: 768px){
  .memb {
    margin: auto;
  }
  h5 {
    white-space: initial;
  }
  
}
</style>