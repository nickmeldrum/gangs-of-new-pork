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
    host: 'www.waitrose.com',
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
    log('auth added', jwt)
    opts.headers['Authorisation'] = jwt
  }

  return new Promise((resolve, reject) => {
    const req = http.request(opts, res => {
      let body = ''

      const setCookie = res.headers['set-cookie']
      if (setCookie) {
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
        log('request complete:', res.statusCode, body)
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
    }
    req.end()
  })
}
