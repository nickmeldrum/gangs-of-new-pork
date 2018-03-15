'use strict'

const api = require('./api-call')

module.exports = () =>
  api.call({
    path: '/authentication-prod/v2/authentication/token',
    method: 'GET',
    sendCookies: true,
  }).then(response => {
    api.storeToken(response.loginResult.jwtString)
    return response
  })
