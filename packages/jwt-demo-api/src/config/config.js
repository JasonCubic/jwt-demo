const configData = {
  dev: {
    EXPRESS_HOST: process.env?.EXPRESS_HOST ?? '0.0.0.0',
    EXPRESS_PORT: parseInt((process.env?.EXPRESS_PORT ?? 9091), 10),
    MAX_CLUSTER_FORKS: 4,

    ACCESS_TOKEN_SECRET: process.env?.ACCESS_TOKEN_SECRET ?? '',
  },
  qa: {
    EXPRESS_HOST: process.env?.EXPRESS_HOST ?? '0.0.0.0',
    EXPRESS_PORT: parseInt((process.env?.EXPRESS_PORT ?? 9091), 10),
    MAX_CLUSTER_FORKS: 12,

    ACCESS_TOKEN_SECRET: process.env?.ACCESS_TOKEN_SECRET ?? '',
  },
  prod: {
    EXPRESS_HOST: process.env?.EXPRESS_HOST ?? '0.0.0.0',
    EXPRESS_PORT: parseInt((process.env?.EXPRESS_PORT ?? 9091), 10),
    MAX_CLUSTER_FORKS: 12,

    ACCESS_TOKEN_SECRET: process.env?.ACCESS_TOKEN_SECRET ?? '',
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
