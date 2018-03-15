'use strict'

const waitroseApi = require('./waitrose-api')

if (process.argv[3] && process.argv[3].toLowerCase().trim() === 'debug') {
  waitroseApi.config.setDebugMode()
}

const searchTerm = process.argv[2]
let tokenObject = {}

waitroseApi.login()
  .then(waitroseApi.token)
  .then(data => {
    tokenObject = data.loginResult
    return waitroseApi.search(data.loginResult.customerId, data.loginResult.orderId, 'bread')
  })
  .then(data => {
    return waitroseApi.product(tokenObject.customerId, tokenObject.orderId, data.componentsAndProducts[0].searchProduct.id)
  })
  .then(console.log)
  .catch(err => console.error('ack ERROR!', err))
