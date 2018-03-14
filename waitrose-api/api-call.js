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
      res.on('readable', () => body += this.read() || '')
      res.on('end', () => resolve(JSON.parse(body)))
    })

    req.on('error', e => reject(e))
    if (options.body) req.write(JSON.stringify(options.body))
    req.end()
  }
})

