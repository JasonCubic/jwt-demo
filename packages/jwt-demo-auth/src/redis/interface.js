const log = require('jwt-demo-logs');
const { getRedisClient } = require('./redis');

async function addRefreshToken(username, refreshToken) {
  const redis = getRedisClient();
  return redis.set(`refresh-tokens:${username}`, refreshToken, 'EX', 60 * 60 * 24 * 7);
}

async function deleteRefreshToken(username, refreshToken) {
  const redis = getRedisClient();
  const redisSideToken = await redis.get(`refresh-tokens:${username}`);
  if (redisSideToken === refreshToken) {
    return redis.del(`refresh-tokens:${username}`);
  }
  log.info(`unable to delete refresh token for ${username} due to token mismatch`);
  return false;
}

async function refreshTokenExists(username, refreshToken) {
  const redis = getRedisClient();
  const redisSideToken = await redis.get(`refresh-tokens:${username}`);
  return redisSideToken === refreshToken;
}

module.exports = {
  addRefreshToken,
  deleteRefreshToken,
  refreshTokenExists,
};
