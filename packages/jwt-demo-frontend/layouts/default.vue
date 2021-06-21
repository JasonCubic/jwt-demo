<template>
  <div class="default-layout">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">JWT Demo</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ $store.state.token.displayName }} </em>
            </template>
            <b-dropdown-item href="#" @click.prevent="handleLogout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <Nuxt />
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container">
        <span class="text-muted">&copy;2021</span>
      </div>
    </footer>
  </div>
</template>

<script>

async function handleLogout() {
  const startTime = Date.now();
  let logoutResponse;
  try {
    logoutResponse = await this.$axios({
      method: 'DELETE',
      baseURL: '/',
      url: '/jwtdemo/auth/logout',
      withCredentials: true, // to send the cookie that has the refresh token in it
    });
    const AmountOfTimeTheQueryTook = Date.now() - startTime;
    console.info(`AJAX TIME (${AmountOfTimeTheQueryTook / 1000.0}s), logoutResponse: `, logoutResponse);
  } catch (error) {
    return;
  }
  this.$store.commit('token/HANDLE_LOGOUT');
  this.$router.push({ path: '/login' });
}

export default {
  name: 'default-layout',
  methods: {
    handleLogout,
  },
};
</script>
