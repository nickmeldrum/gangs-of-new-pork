'use strict'

const waitroseApi = require('./waitrose-api')

waitroseApi.getAllergyFreeProduct('pasta', 'gluten').then(productData => {
  console.log(productData.products[0])
})
