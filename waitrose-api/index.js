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

const getAllergyFreeProduct = (searchTerm, filter) => login()
  .then(token)
  .then(data => {
    tokenObject = data.loginResult
    return searchFiltered(data.loginResult.customerId, data.loginResult.orderId, searchTerm, filter)
  })
  .then(data => product(tokenObject.customerId, tokenObject.orderId, data.componentsAndProducts[0].searchProduct.id))

const addToTrolley = productId => login()
  .then(token)
  .then(data => {
    tokenObject = data.loginResult
    return trolley(data.loginResult.orderId, productId)
  })

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
  getAllergyFreeProduct,
  addToTrolley
}
