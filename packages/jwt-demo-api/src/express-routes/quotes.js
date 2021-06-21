const express = require('express');
const quotes = require('quotesy');
const log = require('jwt-demo-logs');
const { authenticateToken } = require('../express/middleware');

function getQuoteRoute(req, res) {
  const randomQuote = quotes.random();
  log.info('getQuoteRoute randomQuote: ', randomQuote);
  res.status(200).json({ quotes: [randomQuote] });
}

const router = express.Router();

router.use(authenticateToken);

router.get('/', getQuoteRoute);

module.exports = router;
