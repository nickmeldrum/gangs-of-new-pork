exports.gangsOfNewPork = (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.append('Google-Assistant-API-Version', 'v1')

  const userInput = req.body.inputs[0].raw_inputs[0].query

  res.json(['Welcome to gangs of new pork waitrose!'])
  res.status(200).end()
}
