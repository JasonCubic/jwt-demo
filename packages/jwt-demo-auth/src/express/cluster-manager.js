const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const log = require('jwt-demo-logs');
const webserverWorker = require('./web-server-worker');
const config = require('../config/config');

// jscpd:ignore-start
(() => {
  if (cluster.isMaster) {
    for (let j = 0; j < Math.min(numCPUs, config.MAX_CLUSTER_FORKS); j += 1) {
      cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
      if (signal) {
        log.info(`worker ${worker.process.pid} was killed by signal: ${signal}`);
      } else if (code !== 0) {
        log.info(`worker ${worker.process.pid} exited with error code: ${code}`);
      } else {
        log.info(`worker ${worker.process.pid} died`);
      }
      cluster.fork();
    });
  } else {
    webserverWorker(cluster.worker);
  }
})();
// jscpd:ignore-end
