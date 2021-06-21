export default {
  state: () => ({
    accessToken: '',
    username: '',
    displayName: '',
  }),
  mutations: {
    UPDATE_ACCESS_TOKEN(state, payload) {
      const jwtParts = payload.split('.');
      let tokenData = {};
      try {
        tokenData = JSON.parse(atob(jwtParts[1]));
        state.accessToken = payload;
      } catch (error) {
        console.log('unable to decode token data');
        state.accessToken = '';
      }
      state.username = tokenData?.name ?? '';
      state.displayName = tokenData?.displayName ?? '';
    },
    HANDLE_LOGOUT(state) {
      state.accessToken = '';
      state.username = '';
      state.displayName = '';
    },
  },
};
