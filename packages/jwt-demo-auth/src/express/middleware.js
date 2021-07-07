const jwt = require('jsonwebtoken');
const config = require('../config/config');

function verifyRefreshToken(req, res, next) {
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
    res.locals.refreshToken = refreshToken;
    res.locals.refreshTokenInfo = tokenInfo;
    next();
  });
}

module.exports = {
  verifyRefreshToken,
};
