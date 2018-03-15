'use strict'

const waitroseApi = require('./waitrose-api')

if (process.argv[3] && process.argv[3].toLowerCase().trim() === 'debug') {
  waitroseApi.config.setDebugMode()
}

const searchTerm = process.argv[2]

waitroseApi
  .login()
  .then(waitroseApi.token)
  .then(waitroseApi.search.bind(null, 'bread'))
  /*
  .then(response => {
    console.log('SEARCH RESPONSE', response)
    return waitroseApi.trolley('orderId', 'productId')
  })
  */
  .then(console.log)
  .catch(err => console.error('ack ERROR!', err))
