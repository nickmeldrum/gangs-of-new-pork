'use strict'

const product = require('./product')
const search = require('./search')
const token = require('./token')
const trolley = require('./trolley')
const login = require('./login')
const config = require('./config')
const searchFiltered = require('./searchFiltered')
const emptyTrolley = require('./emptyTrolley')


module.exports = {
  product,
  search,
  token,
  trolley,
  login,
  config,
  searchFiltered,
  emptyTrolley,
}
