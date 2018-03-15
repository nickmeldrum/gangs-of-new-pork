'use strict'

const http = require('https')
const config = require('./config')

let cookieHeader = ''
let jwt = ''

const log = function() {
  if (config.debugMode()) {
    console.log(...arguments)
  }
}

exports.storeToken = token => (jwt = token)

exports.call = options => {
  log('making call', options.path)
  const opts = {
    host: 'api.ecom.waitrose.com',
    path: options.path,
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (options.body) {
    options.bodyString = JSON.stringify(options.body)
    opts.headers['Content-Length'] = Buffer.byteLength(options.bodyString)
  }

  if (options.sendCookies && cookieHeader) {
    opts.headers['Cookie'] = cookieHeader
  }

  if (jwt) {
    opts.headers['authorisation'] = jwt
  }

  return new Promise((resolve, reject) => {
    const req = http.request(opts, res => {
      let body = ''

      const setCookie = res.headers['set-cookie']
      if (options.saveCookies && setCookie) {
        cookieHeader = setCookie
          .filter(cookie => !!cookie)
          .map(cookie => cookie.split(';')[0])
          .join(';')
      }

      res.setEncoding('utf8')
      res.on('readable', function() {
        body += this.read() || ''
      })
      res.on('end', () => {
        log('request complete:', res.statusCode, body, res)
        if (res.statusCode > 399) reject(res.statusCode)
        else {
          if (body.length) resolve(JSON.parse(body))
          else resolve()
        }
      })
    })

    req.on('error', e => {
      log('ack request error', e)
      reject(e)
    })

    if (options.body) {
      req.write(options.bodyString)

      log('NICK body', options.bodyString)
      log('NICK REQ', req)
    }


    req.end()
  })
}
