'use strict'

const api = require('./api-call')

module.exports = (orderId, searchTerm) =>
  api.call({
    path: '/api/content-prod/v2/cms/publish/productcontent/search/-1?clientType=WEB_APP',
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
