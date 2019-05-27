<template>
  <div class="member">
    <section class="member py-5">
      <div class="container"> 
        <h1>{{name}}</h1>
        <div class="row">
          <div v-for="(member, i) in groupInfo" :key="i" class="col-md-4 mg-top memb float in-l">
            <div class="card mb-5 mb-lg-0">
              <div class="card-body">
                <div class="row no-gutters justify-content-md-center">
                  <div class="col-lg-2 center">
                    <img v-if="member.picture_ref" v-bind:src="'/images/upload_images/' + member.picture_ref" id="profileThumbnail"/>
                  </div>
                  <div class="col-lg-8 title-container">
                    <h5 class="card-title text-center">{{member.user_name}}</h5>
                  </div>
                  <div class="col-lg-2"></div>
                </div>
                <hr>
                <p :style="statusColor(i)">{{ member.status ? 'available to talk' : 'not available'}}</p>
                <p><a :style="phoneNumberColor(i)" :href='"tel:+1"+formattedTelNumber(i)'> {{member.phone_number}}</a></p>
                <a @click="checkOutMember(i)" class="btn view-member-btn btn-block text-uppercase">View Member Info</a>
              </div>
            </div>
          </div>   
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "member",

};
</script>