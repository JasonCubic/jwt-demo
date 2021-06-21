const express = require('express');
const log = require('jwt-demo-logs');
const config = require('../config/config');
const versionRouter = require('../express-routes/version');
const quotesRouter = require('../express-routes/quotes');

function webserverWorker() {
  const app = express();
  app.use('/jwtdemo/version', versionRouter);
  app.use('/jwtdemo/api/quotes', quotesRouter);

  app
    .listen(config.EXPRESS_PORT, config.EXPRESS_HOST, () => {
      log.info(`Express server worker started, pid ${process.pid}, port ${config.EXPRESS_PORT}, ${app.get('env')} mode`);
    })
    .once('error', (err) => {
      log.error('express error: ', err.message, err);
      process.exit(126);
    });
}

module.exports = webserverWorker;
