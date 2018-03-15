'use strict'

const api = require('./api-call')

module.exports = (customerId, orderId, searchTerm) =>
  api.call({
    path: `/content-prod/v2/cms/publish/productcontent/search/${customerId}?clientType=WEB_APP`,
    method: 'POST',
    body: {
      customerSearchRequest: {
        queryParams: {
          size: 1,
          searchTerm,
          sortBy: 'RELEVANCE',
          searchTags: [],
          filterTags: [],
          orderId,
        },
      },
    },
  })
