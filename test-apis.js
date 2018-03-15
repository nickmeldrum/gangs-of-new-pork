'use strict'

const waitroseApi = require('./waitrose-api')

const searchTerm = process.argv[2]

waitroseApi
  .login()
  .then(waitroseApi.token)
  .then(console.log)
  .catch(console.error)
