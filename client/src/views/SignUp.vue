<template>
  <!-- <body class="bg-dark"> -->
  <div class="container">
    <div class="card card-register mx-auto mt-5">
      <div class="card-header">Register an Account</div>
      <div class="card-body">
        <form>
          <div class="form-group">
            <div class="form-row">
              <div class="col-md-12">
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
              </div>
            </div>
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
          <a class="btn btn-danger" href="login.html">Register</a>
        </form>
        <div class="text-center">
          <a class="d-block small mt-3" href="/login">Login Page</a>
        </div>
      </div>
    </div>
  </div>
  <!-- </body> -->
</template>
<script>
export default {
  name: "signup"
};
</script>