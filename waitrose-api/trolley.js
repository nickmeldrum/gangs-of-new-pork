'use strict'

const apiCall = require('./api-call')

module.exports = (orderId, productId) =>
  apiCall({
    path: `/api/orderitems-prod/v4/orders/${orderId}/trolley/items`,
    method: 'POST',
    sendJwt: true,
    body: {
      productId: productId.toString(),
      quantity: { amount: 1, uom: 'C62' },
      canSubstitute: true,
    },
  })
