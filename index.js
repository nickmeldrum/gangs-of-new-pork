'use strict'

exports.team3hackathon = (req, res) => {
  response = 'This is a sample response from your webhook!'

  res.setHeader('Content-Type', 'application/json')

  //"speech" is the spoken version of the response, "displayText" is the visual version
  res.send(JSON.stringify({ speech: response, displayText: response }))
}
