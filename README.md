----------------------------------------------------------------
Note: this project uses yarn workspaces monorepo pattern.  Yarn is required.
## To install yarn:
```
npm install --global yarn
```

----------------------------------------------------------------

## To run this project locally in Dev mode you need yarn installed:
```
yarn run start
```

## To completely stop this project locally in Dev mode you need yarn installed:
```
yarn run stop
```

----------------------------------------------------------------
## to get random secret key in node
require('crypto').randomBytes(64).toString('hex');


----------------------------------------------------------------
## Note: debatable CSRF vulnerability for this demo in refresh-token route in auth microservice

run this in browser console while logged in:
```js
fetch('http://localhost:9090/jwtdemo/auth/refresh-token', {
  method: 'POST',
  headers: {'Content-type': 'application/json;charset=UTF-8'},
  credentials: 'same-origin'
})
.then(response => response.json())
.then(json => console.log('json: ', json))
.catch(err => console.log('err: ', err));
```
Could be mitigated by:
* implementing csurf tokens: https://www.npmjs.com/package/csurf
* have the refresh-trigger route require an access token.  Then have a timer
  that auto-refreshes the access token in the background before the old access token expires.
