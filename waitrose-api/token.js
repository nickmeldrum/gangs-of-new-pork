'use strict'

const apiCall = require('./api-call')

module.exports = () =>
  apiCall({
    path: '/api/authentication-prod/v2/authentication/token',
    method: 'GET',
    sendCookies: true,
  })
