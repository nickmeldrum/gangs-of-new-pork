'use strict'

const api = require('./api-call')

module.exports = () =>
  api.call({
    path: '/authentication-prod/v2/authentication/login',
    method: 'POST',
    saveCookies: true,
    body: {
      email: 'manikandan.ramanathan501@waitrose.co.uk',
      password: 'periscope01',
    },
  })
