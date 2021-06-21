const Redis = require('ioredis');
const log = require('jwt-demo-logs');
const config = require('../config/config');

let redis;

function getRedisClient() {
  if (!redis) {
    log.info('setting up a new redis client');
    redis = new Redis({
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    });
  }
  return redis;
}

module.exports = { Redis, getRedisClient };
