'use strict'

const apiCall = require('./api-call')

module.exports = (orderId, searchTerm) =>
  apiCall({
    path: '/api/content-prod/v2/cms/publish/productcontent/search/-1?clientType=WEB_APP',
    method: 'POST',
    sendJwt: true,
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
