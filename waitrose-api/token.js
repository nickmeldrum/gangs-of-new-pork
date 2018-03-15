'use strict'

const apiCall = require('./api-call')

module.exports = () => {
  return apiCall({
    path: '/api/authentication-prod/v2/authentication/token',
    method: 'GET',
    sendCookies: true,
  })
}
