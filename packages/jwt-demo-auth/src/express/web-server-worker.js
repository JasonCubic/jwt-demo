const express = require('express');
const log = require('jwt-demo-logs');
const config = require('../config/config');
const jwtAuthRouter = require('../express-routes/jwt-auth');

function webserverWorker() {
  const app = express();
  app.use('/jwtdemo/auth/', jwtAuthRouter);

  // jscpd:ignore-start
  app
    .listen(config.EXPRESS_PORT, config.EXPRESS_HOST, () => {
      log.info(`Express server worker started, pid ${process.pid}, port ${config.EXPRESS_PORT}, ${app.get('env')} mode`);
    })
    .once('error', (err) => {
      log.error('express error: ', err.message, err);
      process.exit(126);
    });
  // jscpd:ignore-end
}

module.exports = webserverWorker;
