<template>
  <div class="group">
    <section class="group py-5">
      <div class="container"> 
        <h1>{{name}}</h1>
          <form @submit.prevent="add(search)">
          <div class="">
            <label class="btn-block" for="inputName">Add a Member</label>
            <input type="text" id="search" v-model="search" placeholder="Search" class="round" autocomplete="off">
            
            <div id="suggest" class="round" >
              <ul style="list-style-type:none;" v-if="suggest.length < 6 && suggest.length > 0">
                <li id="select" @click="fillInput(name)" v-for="name in suggest" :key="name.id"><img v-if="name.picture_ref" v-bind:src="'/images/upload_images/'+name.picture_ref" id="icon"/>  {{name.user_name}}</li>
              </ul>
              <ul style="list-style-type:none;" v-else-if="(suggest.length < 1) && (search.length > 0)">
                <li>NO MATCH</li>
              </ul>
            </div>
            <button type="submit"  class="btn view-member-btn add-btn text-uppercase">Add Member</button>
          </div>
          </form>

        <div class="row">

          <div v-for="member in groupInfo" :key="member.id"  class="col-md-4 mg-top memb float in-l">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <div class="table row no-gutters justify-content-md-center">
                  <div class="col col-lg-2 center">
                    <img v-if="member.picture_ref" v-bind:src="'/images/upload_images/' + member.picture_ref" id="profileThumbnail"/>
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
    </section>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: "group",
  watch: {
    search: function() {
      let array = this.userArray.filter(user => user.user_name.toLowerCase().includes(this.search.toLowerCase()) && this.search.length > 0)
      let levNums = []
      this.suggest = []
      array.forEach((item)=> {
        let m = 0
        item.user_name.split('').forEach(letter => {
          this.search.split('').forEach(char => {
            if (char.toLowerCase() == letter.toLowerCase()) 
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
    this.fillPage()
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
        this.search = ''
        this.fillPage()
      })
    },
    
  }
}
</script>
<style scoped>

ul {
  padding: 0;
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
  max-width: 3em;
  margin: auto;
  border-radius: 10em;
}

section.group {
  /* background: lightgrey; */
  background-size:contain;
  min-height: 100vh;
  background: linear-gradient(to right, #00a799, #b7e3e4));
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