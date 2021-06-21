const jwt = require('jsonwebtoken');
const log = require('jwt-demo-logs');
const config = require('../config/config');

function authenticateToken(req, res, next) {
  const authHeader = req.headers?.authorization ?? '';
  const token = authHeader && authHeader.split(' ')[1];
  if (!token || typeof token.valueOf() !== 'string' || token.length === 0) {
    res.status(401).append('WWW-Authenticate', 'Bearer').send('Token Invalid'); // access token is missing or invalid
    return;
  }
  jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, tokenData) => {
    log.error('ERROR: jwt access token auth failed', err);
    if (err) {
      log.info('jwt verify error: ', err);
      res.status(401).append('WWW-Authenticate', 'Bearer').send('Token Invalid'); // access token failed verification
      return;
    }
    res.locals.tokenData = tokenData;
    next();
  });
}

module.exports = {
  authenticateToken,
};
