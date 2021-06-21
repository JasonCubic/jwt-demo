const express = require('express');
const packageJson = require('../../../../package.json');

// https://expressjs.com/en/guide/routing.html
const router = express.Router();

router.get('/', (request, response) => {
  response.status(200).send(`jwtdemo API v${packageJson.version} (${process.env.NODE_ENV}) is currently running. - node ${process.version}`);
});

module.exports = router;
