'use strict'

const apiCall = require('./api-call')

module.exports = (orderId, productId) =>
  apiCall({
    path: `/api/custsearch-prod/v3/search/-1/${productId}?orderId=${orderId}`,
    method: 'GET',
    sendJwt: true,
  })
