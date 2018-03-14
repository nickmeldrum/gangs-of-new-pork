const http = require('https')

module.exports = options => {
  const opts = {
    host: 'www.waitrose.com',
    path: options.path,
    method: options.method,
  }

  return new Promise((resolve, reject) => {
    const req = http.request(opts, res => {
      const body = ''
      res.setEncoding('utf8')
      res.on('readable', function() { body += this.read() || ''})
      res.on('end', () => {
        if (body.length) resolve(JSON.parse(body))
        else resolve()
      })
    })

    req.on('error', e => reject(e))
    if (options.body) req.write(JSON.stringify(options.body))
    req.end()
  }
)}

