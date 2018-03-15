'use strict'

const waitroseApi = require('./waitrose-api')

if (process.argv[3] && process.argv[3].toLowerCase().trim() === 'debug') {
  waitroseApi.config.setDebugMode()
}

const searchTerm = process.argv[2]

waitroseApi
  .token()
// .login()
// .then(waitroseApi.token)
  /*
  .then(data => {
    return waitroseApi.trolley(data.loginResult.orderId, '003011-1108-1109')
  })
  */
  .then(data => {
    return waitroseApi.search(data.loginResult.customerId, data.loginResult.orderId, 'bread')
  })
  /*
  .then(response => {
    console.log('SEARCH RESPONSE', response)
    return waitroseApi.trolley('orderId', 'productId')
  })
  */
  .then(console.log)
  .catch(err => console.error('ack ERROR!', err))
