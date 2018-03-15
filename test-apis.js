'use strict'

const waitroseApi = require('./waitrose-api')

const searchTerm = process.argv[2]

waitroseApi
  .login()
  .then(waitroseApi.token)
  .then(waitroseApi.search.bind(null, 'bread'))
  .then(response => {
    console.log('SEARCH RESPONSE', response)
    return waitroseApi.trolley('orderId', 'productId')
  })
  .then(console.log)
  .catch(console.error)
