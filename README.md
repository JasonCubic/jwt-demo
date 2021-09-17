# JWT-Demo

Note: this project uses yarn workspaces monorepo pattern.  Yarn is required.

## To install yarn

```bash
npm install --global yarn
```

---

## To run this project locally in Dev mode you need yarn installed

```bash
yarn run start
```

## To completely stop this project locally in Dev mode you need yarn installed

```bash
yarn run stop
```

---

## to get random secret key in node

```js
require('crypto').randomBytes(64).toString('hex');
```

---

## linting info

* a diff of the mega linter setup but before any lint fixes: <https://github.com/JasonCubic/jwt-demo/compare/linter-setup-pre-lint>
* changes made to make the linters pass: <https://github.com/JasonCubic/jwt-demo/compare/linter-setup-pre-lint...lint-fix>

### Some vscode extensions to make linting easier

* eslint: <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>
* dockerfiles: <https://marketplace.visualstudio.com/items?itemName=exiasr.hadolint>
* bash: <https://marketplace.visualstudio.com/items?itemName=timonwong.shellcheck>
* bash: <https://marketplace.visualstudio.com/items?itemName=foxundermoon.shell-format>
* markdown: <https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint>
* jscpd: <https://marketplace.visualstudio.com/items?itemName=paulhoughton.vscode-jscpd>
* prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>

---

## to troubleshoot prettier issues

Error:

```bash
Code style issues found in the above file(s). Forgot to run Prettier?
```

To verify the linting isn't fixed yet: `prettier --config .prettierrc.json --check myfile.json`

### To see the differences prettier is looking for

* launch the docker compose interactive mega linter: `yarn run local:lint:interactive`
* goto the folder /tmp/lint
* run `cat myfile.js | prettier --parser babel | diff myfile.js -`
* compare the difference

---

## To disable a semgrep rule using inline comments

See: <https://semgrep.dev/docs/ignoring-findings/#inline-comments>

---

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

* implementing csurf tokens: <https://www.npmjs.com/package/csurf>
* have the refresh-trigger route require an access token.  Then have a timer
  that auto-refreshes the access token in the background before the old access token expires.

---

## Sonarqube local scanning

```bash
 _____                                   _
/  ___|                                 | |
\ `--.  ___  _ __   __ _ _ __ __ _ _   _| |__   ___
 `--. \/ _ \| '_ \ / _` | '__/ _` | | | | '_ \ / _ \
/\__/ / (_) | | | | (_| | | | (_| | |_| | |_) |  __/
\____/ \___/|_| |_|\__,_|_|  \__, |\__,_|_.__/ \___|
                                | |
                                |_|
```

First start a local sonarqube server

```bash
docker run --rm -d --name sonarqube -p "9000:9000" sonarqube
```

Wait for the sonarqube server to come all the way up.  It is slow.

To make sure its up you can wait for the webpage to load: <http://localhost:9000/about>
You can login if you want (You don't have to).  username: `admin`  password: `admin`

Change the password when you login to something you can remember.

Create a user token: <https://docs.sonarqube.org/latest/user-guide/user-token>

To stop the sonarqube server:

```bash
docker stop sonarqube
```

Next open powershell and navigate to this folder.

To sonarqube scan all of the edge modules

```bash
node ./utils/sonarqube-scan.js <sonarqube_token_goes_here>
```

Sonarqube local scanning notes:

* This will create the sonarqube projects if they are not already created.
* The scan for 7 modules takes about 15 minutes.
* rarely when I was running the scans the sonarsource cli hung and I had to restart docker

hi dev guild!
