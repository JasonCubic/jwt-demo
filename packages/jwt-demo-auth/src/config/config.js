const configData = {
  dev: {
    EXPRESS_HOST: process.env?.EXPRESS_HOST ?? '0.0.0.0',
    EXPRESS_PORT: parseInt((process.env?.EXPRESS_PORT ?? 9092), 10),
    MAX_CLUSTER_FORKS: 4,

    ACCESS_TOKEN_SECRET: process.env?.ACCESS_TOKEN_SECRET ?? '',
    REFRESH_TOKEN_SECRET: process.env?.REFRESH_TOKEN_SECRET ?? '',

    REDIS_HOST: process.env?.REDIS_HOST ?? 'jwt-demo-redis',
    REDIS_PORT: parseInt(process.env?.REDIS_PORT ?? 6379, 10),
  },
  qa: {
    EXPRESS_HOST: process.env?.EXPRESS_HOST ?? '0.0.0.0',
    EXPRESS_PORT: parseInt((process.env?.EXPRESS_PORT ?? 9092), 10),
    MAX_CLUSTER_FORKS: 12,

    ACCESS_TOKEN_SECRET: process.env?.ACCESS_TOKEN_SECRET ?? '',
    REFRESH_TOKEN_SECRET: process.env?.REFRESH_TOKEN_SECRET ?? '',

    REDIS_HOST: process.env?.REDIS_HOST ?? 'jwt-demo-redis',
    REDIS_PORT: parseInt(process.env?.REDIS_PORT ?? 6379, 10),
  },
  prod: {
    EXPRESS_HOST: process.env?.EXPRESS_HOST ?? '0.0.0.0',
    EXPRESS_PORT: parseInt((process.env?.EXPRESS_PORT ?? 9092), 10),
    MAX_CLUSTER_FORKS: 12,

    ACCESS_TOKEN_SECRET: process.env?.ACCESS_TOKEN_SECRET ?? '',
    REFRESH_TOKEN_SECRET: process.env?.REFRESH_TOKEN_SECRET ?? '',

    REDIS_HOST: process.env?.REDIS_HOST ?? 'jwt-demo-redis',
    REDIS_PORT: parseInt(process.env?.REDIS_PORT ?? 6379, 10),
  },
};

function config() {
  if (process.env.NODE_ENV === 'production') {
    return configData.prod;
  }
  if (process.env.NODE_ENV === 'test') {
    return configData.qa;
  }
  return configData.dev;
}

module.exports = (config)();
