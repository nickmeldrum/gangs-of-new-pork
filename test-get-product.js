'use strict'

const waitroseApi = require('./waitrose-api')

waitroseApi.getProduct('pasta').then(productData => {
  console.log(productData.products[0].allergens)
})
