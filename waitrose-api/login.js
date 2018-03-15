'use strict'

const api = require('./api-call')

module.exports = () =>
  api.call({
    path: '/api/authentication-prod/v2/authentication/login',
    method: 'POST',
    saveCookies: true,
    body: {
      email: 'test@nickmeldrum.com',
      password: 'Password1',
    },
  })
