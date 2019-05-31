<template>
<div class="login">
  <body class="login-bg">
    <div class="container">
      <div v-if="message" class="alert alert-danger text-center" role="alert">
      {{message}}
      </div>
      <div class="row">
        <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div class="card card-signin my-5">
            <div class="card-body">
              <h5 class="card-title text-center">Sign In</h5>
              <form @submit.prevent="logMeIn()" class="form-signin" autocomplete="on" >
                <div class="form-label-group">
                  <input
                    type="email"
                    id="inputEmail"
                    v-model="email"
                    class="form-control"
                    placeholder="Email address"
                    required
                    autofocus
                    autocomplete="on"
                  >
                  <label for="inputEmail">Email address</label>
                </div>

                <div class="form-label-group">
                  <input
                    type="password"
                    id="inputPassword"
                    v-model="password"
                    class="form-control"
                    placeholder="Password"
                    required
                    autocomplete="on"
                  >
                  <label for="inputPassword">Password</label>
                </div>

                <div class="custom-control custom-checkbox mb-3">
                  <input type="checkbox" class="custom-control-input" id="customCheck1">
                  <label class="custom-control-label" for="customCheck1">Remember password</label>
                </div>
                <button
                  class="btn btn-lg sign-in btn-block text-uppercase"
                  type="submit"
                >Sign in</button>
                <hr class="my-4">
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</div>
</template>
<script>
import axios from 'axios'
export default {
  name: "login",
  methods: {
    logMeIn: function() {
      let data = {
        email: this.email,
        password: this.password
      }
      axios.post('/login',data).then(res => {
        console.log("POST - /login");
        console.log(res);
        this.$emit('loggedIn', {loggedIn: true, id: res.data });
      })
      .catch(err => {
        console.log("> CS Login authentication error");
        console.log(err.response.data);
        this.message = err.response.data.error;
      });
    },

    dataTest: function() {
      axios.get("/login", data).then( res => {
        
        console.log("GET - /login");
        console.log(res);
      });
    }
  },
  data: function() {
    return {
      email: '',
      password: '',
      message: ''
    }
  }
};
</script>

<style lang="scss">
:root {
  --input-padding-x: 1.5rem;
  --input-padding-y: 0.75rem;
}

.login-bg {
  background: #00a799;
  background: linear-gradient(to right, #00a799, #b7e3e4);
  height: 100vh;
}

.card-signin {
  border: 0;
  border-radius: 1rem;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.card-signin .card-title {
  margin-bottom: 2rem;
  font-weight: 300;
  font-size: 1.5rem;
  font-family: "Quicksand", sans-serif;
}

.card-signin .card-body {
  padding: 2rem;
}

.form-signin {
  width: 100%;
}

.form-signin .btn {
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

.sign-in {
  background: #ff585b;
  color: white;
}

.sign-in:hover {
  background: #ff585b;
  color: black;
}
</style>