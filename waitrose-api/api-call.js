const http = require('https')

module.exports = options => {
  if (options.body) options.bodyString = JSON.stringify(options.body)

  const opts = {
    host: 'www.waitrose.com',
    path: options.path,
    method: options.method,
    headers: {
      'Content-Type': 'application/json',
    }, 
  }

  if (options.body) opts.headers['Content-Length'] = Buffer.byteLength(options.bodyString)

  return new Promise((resolve, reject) => {
    const req = http.request(opts, res => {
      let body = ''
      res.setEncoding('utf8')
      res.on('readable', function() { body += this.read() || ''})
      res.on('end', () => {
        if (res.statusCode > 399) reject(res.statusCode)
        else {
          if (body.length) resolve(JSON.parse(body))
          else resolve()
        }
      })
    })

    req.on('error', e => reject(e))
    if (options.body) req.write(options.bodyString)
    req.end()
  })
}
