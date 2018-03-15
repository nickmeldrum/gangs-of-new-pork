'use strict'

const waitroseApi = require('./waitrose-api')

const productAllergies = ['bread', 'milk']
let userAllergy = ''

exports.team3hackathon = function team3hackathon(req, res) {
  let addToTrolleyIndicator = req.body.result.parameters['addToTrolley']
  let allergyindicator = req.body.result.parameters['allergyindicator']
  let resetindicator = req.body.result.parameters['resetallergies']

  if (addToTrolleyIndicator) {
    addToTrolley(req, res)
  } else if (allergyindicator) {
    saveallergyindicator(req, res)
  } else if (resetindicator) {
    resetindicator(req, res)
  }
}

const sendResponse = response => {
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify({ speech: response, displayText: response }))
}

function addToTrolley(req, res) {
  const product = req.body.result.parameters['Product']

  if (!product) return sendResponse('Sorry, what product?')
  if (product.length > 1) return sendResponse('Sorry we can only deal with 1 product right now')
  if (!userAllergy) return sendResponse('Sorry, we do not know your allergy information yet')

  waitroseApi.getProduct(product[0]).then(productData => {
    const allergens = productData.products[0].allergens
    const allergyMap = {
      gluten: 'suitableForThoseAvoidingGluten',
      milk: 'suitableForThoseAvoidingMilk',
      eggs: 'suitableForThoseAvoidingEgg',
      nuts: 'suitableForThoseAvoidingNuts',
      soya: 'suitableForThoseAvoidingSoya',
      meat: 'suitableForVegetarians',
      'meat products': 'suitableForVegans',
    }

    if (allergyMap.keys.includes(userAllergy) && !allergens[allergyMap[userAllergy]]) {
      return sendResponse(`${product[0]} contains ${userAllergy} would you like to hear about an alternative product?`)
    }

    return sendResponse(`Okay ${product[0]} has been added to your trolley TEST`)
  })
}

function saveallergyindicator(req, res) {
  userAllergy = req.body.result.parameters['allergy']

  if (userAllergy && userAllergy.length > 0) {
    response = 'Okay...We will keep you safe.'
  } else {
    response = 'Okay..Looks like you have not got any allergy.'
  }
  //Default response from the webhook to show it's working

  res.setHeader('Content-Type', 'application/json') //Requires application/json MIME type
  res.send(
    JSON.stringify({
      speech: response,
      displayText: response,
      //"speech" is the spoken version of the response, "displayText" is the visual version
    }),
  )
}

function resetindicator(req, res) {
  let userAllergy = ''

  response = 'Okay..I have deleted all your allergies information.'

  res.setHeader('Content-Type', 'application/json') //Requires application/json MIME type
  res.send(
    JSON.stringify({
      speech: response,
      displayText: response,
      //"speech" is the spoken version of the response, "displayText" is the visual version
    }),
  )
}
