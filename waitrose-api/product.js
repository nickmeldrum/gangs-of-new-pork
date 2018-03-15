'use strict'

const api = require('./api-call')

module.exports = (customerId, orderId, productId) =>
  api.call({
    path: `/custsearch-prod/v3/search/${customerId}/${productId}?orderId=${orderId}`,
    method: 'GET',
  })
