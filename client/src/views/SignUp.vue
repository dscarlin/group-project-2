<template>
<div class="signup">
  <body class="signup-bg">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-10 col-lg-10 mx-auto">
          <div class="card card-register mx-auto mt-5">
            <div class="card-body">
              <h5 class="card-title text-center">Register an Account</h5>
              <form class="form-register">
                <div class="form-label-group">
                  <input
                    type="text"
                    id="firstLastName"
                    class="form-control"
                    placeholder="First and Last name"
                    required="required"
                    autofocus="autofocus"
                  >
                  <label for="firstLastName">First and Last name</label>
                </div>
                <div class="form-group">
                  <div class="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      class="form-control"
                      placeholder="Email address"
                      required="required"
                    >
                    <label for="inputEmail">Email address</label>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-row">
                    <div class="col-md-6">
                      <div class="form-label-group">
                        <input
                          type="password"
                          id="inputPassword"
                          class="form-control"
                          placeholder="Password"
                          required="required"
                        >
                        <label for="inputPassword">Password</label>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-label-group">
                        <input
                          type="password"
                          id="confirmPassword"
                          class="form-control"
                          placeholder="Confirm password"
                          required="required"
                        >
                        <label for="confirmPassword">Confirm password</label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  @click="signMeUp"
                  class="btn btn-lg register btn-block text-uppercase"
                  type="submit"
                >Register</button>
              </form>
              <div class="text-center">
                <a class="d-block small mt-3" href="#">Login Page</a>
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
  name: "signup",
  methods: {
    signMeUp: function() {
      this.$emit("signedUp", true);
    }
  }
};
</script>



<style lang="scss">
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.signup-bg {
  background: #00a799;
  background: linear-gradient(to right, #00a799, #b7e3e4);
  height: 100vh;
}

.card-register {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-register .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
  font-family: "Quicksand", sans-serif;
}

.card-register .card-body {
  padding: 2rem;
}

.form-register {
  width: 100%;
}

.form-register .btn {
  font-size: 80%;
  border-radius: 5rem;
  letter-spacing: 0.1rem;
  font-weight: bold;
  padding: 1rem;
  transition: all 0.2s;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
}

.form-label-group input {
  height: auto;
  border-radius: 2rem;
}

.form-label-group > input,
.form-label-group > label {
  padding: var(--input-padding-y) var(--input-padding-x);
}

.form-label-group > label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  margin-bottom: 0;
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  transition: all 0.1s ease-in-out;
}

.form-label-group input::-webkit-input-placeholder {
  color: transparent;
}

.form-label-group input:-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-ms-input-placeholder {
  color: transparent;
}

.form-label-group input::-moz-placeholder {
  color: transparent;
}

.form-label-group input::placeholder {
  color: transparent;
}

.form-label-group input:not(:placeholder-shown) {
  padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
  padding-bottom: calc(var(--input-padding-y) / 3);
}

.form-label-group input:not(:placeholder-shown) ~ label {
  padding-top: calc(var(--input-padding-y) / 3);
  padding-bottom: calc(var(--input-padding-y) / 3);
  font-size: 12px;
  color: #777;
}

.register {
  background: #ff585b;
  color: white;
}

.register:hover {
  background: #ff585b;
  color: black;
}
</style>