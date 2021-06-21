const configData = {
  dev: {
    LOG_LOCALE: 'en-US',
    LOG_TIMEZONE: 'America/Los_Angeles',
    LOG_LOCAL_DATE_FORMAT: 'yyyy-MM-dd hh:mm:ssaaa',
  },
  qa: {
    LOG_LOCALE: 'en-US',
    LOG_TIMEZONE: 'America/Los_Angeles',
    LOG_LOCAL_DATE_FORMAT: 'yyyy-MM-dd hh:mm:ssaaa',
  },
  prod: {
    LOG_LOCALE: 'en-US',
    LOG_TIMEZONE: 'America/Los_Angeles',
    LOG_LOCAL_DATE_FORMAT: 'yyyy-MM-dd hh:mm:ssaaa',
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
