<template>
  <form class="form-signin" @submit.prevent="handleSubmit">
    <div class="text-center mb-4">
      <!-- https://www.svgrepo.com/show/28662/hand-holding-up-a-gear.svg -->
      <SelfServiceIcon style="width:50%"/>
      <h1 class="h3 mb-3 font-weight-normal">JWT Demo</h1>
      <p>Please sign in</p>
    </div>

    <div class="form-label-group">
      <input type="text" id="inputUsername" name="username" class="form-control floating" placeholder="Username" autocomplete="off" required autofocus>
      <label for="inputUsername">Username</label>
    </div>

    <div class="form-label-group">
      <input type="password" id="inputPassword" name="password" class="form-control floating" placeholder="Password" autocomplete="off" required>
      <label for="inputPassword">Password</label>
    </div>

    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    <!-- <p class="mt-5 mb-3 text-muted text-center">&copy; 2021</p> -->
    <p class="mt-5">users and passwords that should work for this demo</p>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">username</th>
          <th scope="col">password</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">ckent</th>
          <td>super</td>
        </tr>
        <tr>
          <th scope="row">bwayne</th>
          <td>bat</td>
        </tr>
        <tr>
          <th scope="row">dprince</th>
          <td>wonder</td>
        </tr>
        <tr>
          <th scope="row">ballen</th>
          <td>flash</td>
        </tr>
        <tr>
          <th scope="row">hjordan</th>
          <td>green</td>
        </tr>
        <tr>
          <th scope="row">acurry</th>
          <td>aqua</td>
        </tr>
        <tr>
          <th scope="row">jjones</th>
          <td>martian</td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<script>
async function handleSubmit(event) {
  const { username, password } = Object.fromEntries(new FormData(event.target));
  const startTime = Date.now();
  let loginResponse;
  try {
    loginResponse = await this.$axios({
      method: 'POST',
      baseURL: '/',
      url: '/jwtdemo/auth/login',
      data: { username, password },
    });
    const AmountOfTimeTheQueryTook = Date.now() - startTime;
    console.info(`AJAX TIME (${AmountOfTimeTheQueryTook / 1000.0}s) login`);
  } catch (error) {
    return;
  }
  this.$store.commit('token/UPDATE_ACCESS_TOKEN', loginResponse?.data?.accessToken ?? '');
  if (this.$store.state.token.accessToken && typeof this.$store.state.token.accessToken.valueOf() === 'string' && this.$store.state.token.accessToken.length > 0) {
    this.$router.push({ path: '/' });
  } else {
    console.log('invalid login');
    this.$bvToast.toast('invalid login', { title: 'Login Error', autoHideDelay: 3000 });
  }
}

export default {
  name: 'login',
  layout: 'login',
  components: true,
  methods: {
    handleSubmit,
  },
};
</script>

<style>

:root {
  --input-padding-x: .75rem;
  --input-padding-y: .75rem;
}

.form-signin {
  width: 100%;
  max-width: 420px;
  padding: 15px;
  margin: 0 auto;
}

.form-label-group {
  position: relative;
  margin-bottom: 1rem;
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
  margin-bottom: 0; /* Override default `<label>` margin */
  line-height: 1.5;
  color: #495057;
  border: 1px solid transparent;
  border-radius: .25rem;
  transition: all .1s ease-in-out;
  cursor: text;
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

.form-control.floating {
  height: 50px;
}

</style>
