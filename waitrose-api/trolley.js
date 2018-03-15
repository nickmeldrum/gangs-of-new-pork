'use strict'

module.exports = function trolley(jwtString, orderId, productId) {
  const http = require('https')

  const postData = JSON.stringify({
    canSubstitute: true,
    productId: `${productId}`,
    quantity: { amount: 1, uom: 'C62' },
    trolleyItemId: -1,
  })

  const options = {
    host: 'www.waitrose.com',
    path: `/api/orderitems-prod/v4/orders/${orderId}/trolley/items`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
      Authorization: jwtString,
    },
  }

  const req = http.request(options, res => {
    let body = ''
    console.log(`STATUS: ${res.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`)
    res.setEncoding('utf8')
    res.on('data', chunk => {
      body += chunk
    })
    res.on('end', () => {
      console.log('trolley response ', body)
      console.log('No more data in response.')
    })
  })

  req.on('error', e => {
    console.error(`problem with request: ${e.message}`)
  })

  // write data to request body
  req.write(postData)
  req.end()
}
