'use strict'

const api = require('./api-call')

module.exports = (orderId) =>
  api.call({
    path: `/orderitems-prod/v4/orders/${orderId}/trolley/items`,
    method: 'DELETE',
  })
