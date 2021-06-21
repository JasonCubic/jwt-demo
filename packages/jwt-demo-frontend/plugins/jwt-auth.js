async function getRefreshedAccessTokenResponse($axios) {
  const startTime = Date.now();
  let refreshAccessTokenResponse;
  try {
    refreshAccessTokenResponse = await $axios({
      method: 'POST',
      baseURL: '/',
      url: '/jwtdemo/auth/refresh-token',
      withCredentials: true, // to send the cookie that has the refresh token in it
    });
    const AmountOfTimeTheQueryTook = Date.now() - startTime;
    console.info(`AJAX TIME (${AmountOfTimeTheQueryTook / 1000.0}s), refresh Access Token`);
  } catch (error) {
    return error?.response;
  }
  return refreshAccessTokenResponse;
}

async function retryAjax($axios, config) {
  const startTime = Date.now();
  let retryAjaxResponse;
  try {
    retryAjaxResponse = await $axios(config);
    const AmountOfTimeTheQueryTook = Date.now() - startTime;
    console.info(`AJAX TIME (${AmountOfTimeTheQueryTook / 1000.0}s), retry ajax`);
  } catch (error) {
    return error?.response;
  }
  return retryAjaxResponse;
}

function handleAuthRouteError(error, redirect) {
  console.log('error?.response?.status: ', error?.response?.status);
  console.log('error?.response?.statusText: ', error?.response?.statusText);
  console.log('error?.request?.responseText: ', error?.request?.responseText);
  if ((error?.config?.url ?? '').toLowerCase() !== '/jwtdemo/auth/login') {
    // maybe the refresh token has expired and the user needs to login again
    redirect('/login');
  }
  return null;
}

function handleAxiosError({ $axios, store, redirect }) {
  $axios.onError(async (error) => {
    const isRouteForAuthService = (error?.config?.url ?? '').toLowerCase().startsWith('/jwtdemo/auth');
    if (isRouteForAuthService) {
      return handleAuthRouteError(error, redirect);
    }
    const isStillAnErrorAfterRefreshingTheToken = error?.config?.headers?.secondAttempt === true;
    if (isStillAnErrorAfterRefreshingTheToken) {
      if (error.response) {
        console.log('error.response: ', error.response);
      } else if (error.request) {
        console.log('error.request', error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log('error.config', error.config);
      console.log('unable to access resource even with a refreshed token');
      redirect('/login');
      return error;
    }
    const isErrorNotForUnauthorizedAccess = error?.response?.status !== 401;
    if (isErrorNotForUnauthorizedAccess) {
      if (error.response) {
        console.log('error.response: ', error.response);
      } else if (error.request) {
        console.log('error.request', error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log('error.config', error.config);
      return error;
    }
    const newAccessTokenResponse = await getRefreshedAccessTokenResponse($axios);
    if (newAccessTokenResponse?.status !== 200) {
      console.log('unable to refresh the access token', newAccessTokenResponse);
      return error;
    }
    const accessToken = newAccessTokenResponse?.data?.accessToken;
    store.commit('token/UPDATE_ACCESS_TOKEN', accessToken);
    const newConfig = {
      ...error?.config,
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        secondAttempt: true,
      },
    };
    return retryAjax($axios, newConfig);
  });
}

export default handleAxiosError;
