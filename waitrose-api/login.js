const apiCall = require('./api-call')

module.exports = () => {
  return apiCall({
    path: '/api/authentication-prod/v2/authentication/login',
    method: 'POST',
    body: {
      email: 'test@nickmeldrum.com',
      password: 'Password1',
    }
  })
})
