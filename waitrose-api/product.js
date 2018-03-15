'use strict'

const api = require('./api-call')

module.exports = (orderId, productId) =>
  api.call({
    path: `/api/custsearch-prod/v3/search/-1/${productId}?orderId=${orderId}`,
    method: 'GET',
  })
