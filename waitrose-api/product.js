'use strict'

module.exports = function product(jwtString, orderId, productId) {
    const http = require('https')

    const options = {
      host: 'www.waitrose.com',
      path: `/api/custsearch-prod/v3/search/-1/${productId}?orderId=${orderId}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': jwtString
      }
    };
  
    const req = http.request(options, (res) => {
        let body = ''
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        body += chunk
      });
      res.on('end', () => {
        console.log(`BODY: ${body}`);
        console.log('No more data in response.');
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    console.log(req);
    req.end();
  }