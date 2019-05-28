<template>
<div class="about">
  <body class="about-bg">
    <div class="container">
      <div class="row">
        <div class="col-sm-10 col-md-10 col-lg-10 mx-auto">
          <div class="card card-about my-5">
            <div class="card-body">
              <h1 class="card-title text-center">
                <!-- logo here -->
                <strong>REc(=)nnect</strong>
              </h1>

              <h4>Project Description:</h4>
              <p>REc(=)nnect is for people to create groups and notify that they are available to catch up on the phone for a specified period of time. In a modern world of text-only communication with ambiguity of meanings and no assurance of a response, wouldn't it be nice to know who you could call on the phone without needing to know their schedule or feeling like you are going to bother them? You want to catch up, but you don't want to spend 20 minutes calling five or six people to see if they are free to talk. We have got you covered!</p>
              <h4>Minimum Viable Product:</h4>
              <p>This application will register a new user, allow existing users to log in, create a new group, search for members, allow users to add members or delete members, set your current availability, and send notifications for people currently available.</p>
            </div>
            <div>
              <h2 class="card-title text-center">
                About:
                <strong>team.slice("pizza")</strong>
                <br>
              </h2>
              <div class="row">
                <h1 class="text-center">pee</h1>
              </div>
              <div class="row">
                <h1 class="text-center">poop</h1>
              </div>
              <div class="row">
                <h1 class="text-center">vom</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</div>
</template>
<script>
export default {
  name: "about"
};
</script>
<style lang="scss">
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.about-bg {
  background: #00a799;
  background: linear-gradient(to right, #00a799, #b7e3e4);
  height: 100vh;
}
.card-title,
h2,
h1 {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
  font-family: "Quicksand", sans-serif;
}
// h1 {
//   font-size: 2rem;
// }
p,
h4 {
  font-size: 0.85rem;
}
.card-body {
  padding: 2rem;
}
</style>