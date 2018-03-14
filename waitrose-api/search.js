module.exports = function search (jwtString, orderId, searchTerm) {
    const http = require('https');
  
    const postData = JSON.stringify({
      "customerSearchRequest":{
        "queryParams":{
          "size":1,
          "searchTerm":searchTerm,
          "sortBy":"RELEVANCE",
          "searchTags":[],
          "filterTags":[],
          "orderId":orderId}
        }
      });
    
    const options = {
      host: 'www.waitrose.com',
      path: '/api/content-prod/v2/cms/publish/productcontent/search/-1?clientType=WEB_APP',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'Authorization': jwtString
      }
    };
  
    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    
    req.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
    
    // write data to request body
    req.write(postData);
    req.end();
  }