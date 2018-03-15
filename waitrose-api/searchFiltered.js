'use strict'

const api = require('./api-call')

module.exports = (customerId, orderId, searchTerm, filterKey) => {
  let filterTags
  switch(filterKey) {
    case 'gluten':
      filterTags = [{id:"suitableforthoseavoidingglutenfilter",value:"Suitable_for_those_avoiding_gluten"}]
      break
    case 'milk':
      filterTags = [{id:"suitableforthoseavoidingmilkfilter",value:"Suitable_for_those_avoiding_milk"}]
      break
    case 'nuts':
      filterTags = [{id:"suitableforthoseavoidingnutsfilter",value:"Suitable_for_those_avoiding_nuts"}]
      break
    case 'egg':
      filterTags = [{id:"suitableforthoseavoidingeggfilter",value:"Suitable_for_those_avoiding_egg"}]
      break
    case 'soya':
      filterTags = [{id:"suitableforthoseavoidingsoyafilter",value:"Suitable_for_those_avoiding_soya"}]
      break
  }
  return api.call({
    path: `/content-prod/v2/cms/publish/productcontent/search/${customerId}?clientType=WEB_APP`,
    method: 'POST',
    body: {
      customerSearchRequest: {
        queryParams: {
          size: 1,
          searchTerm,
          sortBy: 'RELEVANCE',
          searchTags: [],
          filterTags,
          orderId,
        },
      },
    },
  })
}
