'use strict'

const product = require('./product')
const search = require('./search')
const token = require('./token')
const trolley = require('./trolley')
const login = require('./login')
const config = require('./config')
const searchFiltered = require('./searchFiltered')
const emptyTrolley = require('./emptyTrolley')


let tokenObject = {}

const getProduct = searchTerm => login()
  .then(token)
  .then(data => {
    tokenObject = data.loginResult
    return search(data.loginResult.customerId, data.loginResult.orderId, searchTerm)
  })
  .then(data => product(tokenObject.customerId, tokenObject.orderId, data.componentsAndProducts[0].searchProduct.id))

module.exports = {
  product,
  search,
  token,
  trolley,
  login,
  config,
  getProduct,
  searchFiltered,
  emptyTrolley,
}
