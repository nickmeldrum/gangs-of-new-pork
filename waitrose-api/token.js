const search = require('./search')

module.exports = function token(searchTerm) {
  const http = require('https');
  
  const options = {
    host: 'www.waitrose.com',
    path: '/api/authentication-prod/v2/authentication/token',
    method: 'GET',
  };

  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      const jwt = JSON.parse("" + chunk).loginResult.jwtString;
      const orderId = JSON.parse("" + chunk).loginResult.orderId;
      console.log("JWT ", jwt);
      search(jwt, orderId, searchTerm);
    });
    res.on('end', () => {
      console.log('No more data in response.');
    });
  });
  
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  
  req.end();
}