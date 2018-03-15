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
    return waitroseApi.search(data.loginResult.customerId, data.loginResult.orderId, searchTerm)
  })
  .then(data => waitroseApi.product(tokenObject.customerId, tokenObject.orderId, data.componentsAndProducts[0].searchProduct.id))
  .then(data => {
    console.log('product adding:', data)
    return waitroseApi.trolley(tokenObject.orderId, data.products[0].id)
  })
  .catch(err => console.error('ack ERROR!', err))
