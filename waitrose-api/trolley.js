'use strict'

const api = require('./api-call')

module.exports = (orderId, productId) =>
  api.call({
    path: `/api/orderitems-prod/v4/orders/${orderId}/trolley/items`,
    method: 'POST',
    body: {
      productId: productId.toString(),
      quantity: { amount: 1, uom: 'C62' },
      canSubstitute: true,
    },
  })
