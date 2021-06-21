const express = require('express');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const log = require('jwt-demo-logs');
const { addRefreshToken, deleteRefreshToken, refreshTokenExists } = require('../redis/interface');
const { verifyAuthentication } = require('../fake-authn/interface');
const config = require('../config/config');
const packageJson = require('../../../../package.json');

function handleVersionRoute(req, res) {
  res.status(200).send(`jwtdemo auth v${packageJson.version} (${process.env.NODE_ENV}) is currently running. - node ${process.version}`);
}

function generateAccessToken(user) {
  return jwt.sign(user, config.ACCESS_TOKEN_SECRET, { expiresIn: '5m' });
}

async function handleLoginRoute(req, res) {
  const { username, password } = req.body;
  let authUserObj = {};
  try {
    authUserObj = await verifyAuthentication(username, password);
  } catch (err) {
    log.info(`ERROR: unable verify credentials for user "${username}"`, err.message);
    res.status(401).json({ errors: ['ERROR: unable verify user credentials.', err.message] });
    return;
  }
  const tokenData = { name: username, displayName: (authUserObj?.displayName ?? '') };
  const accessToken = generateAccessToken(tokenData);
  const refreshToken = jwt.sign(tokenData, config.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  await addRefreshToken(username, refreshToken);
  res.setHeader('Set-Cookie', cookie.serialize('rt', refreshToken, { httpOnly: true, SameSite: 'strict', expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }));
  res.status(200).json({ accessToken });
}

function handleLogoutRoute(req, res) {
  const refreshToken = req?.cookies?.rt ?? '';
  if (!refreshToken || typeof refreshToken.valueOf() !== 'string' || refreshToken.length === 0) {
    res.sendStatus(401);
    return;
  }
  jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, async (err, tokenInfo) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    const { name } = tokenInfo;
    await deleteRefreshToken(name, refreshToken);
    res.sendStatus(204);
  });
}

function handleRefreshAccessTokenRoute(req, res) {
  const refreshToken = req?.cookies?.rt ?? '';
  if (!refreshToken || typeof refreshToken.valueOf() !== 'string' || refreshToken.length === 0) {
    res.sendStatus(401);
    return;
  }
  jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET, async (err, tokenInfo) => {
    if (err) {
      res.sendStatus(401);
      return;
    }
    const { name } = tokenInfo;
    const isTokenPresent = await refreshTokenExists(name, refreshToken);
    if (isTokenPresent === false) {
      res.sendStatus(403);
      return;
    }
    const accessToken = generateAccessToken({ name: tokenInfo.name, displayName: tokenInfo.displayName });
    res.json({ accessToken });
  });
}

const router = express.Router();

router.get('/version', handleVersionRoute);
router.post('/login', express.json(), express.urlencoded({ extended: false }), handleLoginRoute);
router.delete('/logout', cookieParser(), handleLogoutRoute);
router.post('/refresh-token', cookieParser(), handleRefreshAccessTokenRoute);

module.exports = router;
