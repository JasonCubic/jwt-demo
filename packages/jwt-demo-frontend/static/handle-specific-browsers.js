// eslint-disable-next-line no-undef, no-var
var parserResults = new UAParser().getResult(); // https://github.com/faisalman/ua-parser-js
if (parserResults && parserResults.browser && parserResults.browser.name === 'IE') {
  window.location.replace('/jwtdemo/non-compatible.html');
}
console.log('browser info: ', parserResults);
