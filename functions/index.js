'use strict';

const waitroseApi = require('./waitrose-api')

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const ALLERGY_ACTION = 'set_allergy_preferences';
const ALLERGY_ARGUMENT = 'allergy';

const PRODUCT_ACTION = 'add_product';
const PRODUCT_ARGUMENT = 'Product';

let userAllergy = '';

exports.team3hackathon = functions.https.onRequest((request, response) => {
  const app = new App({request, response});

  function saveAllergy(app) {
    userAllergy = app.getArgument(ALLERGY_ARGUMENT);

    if (userAllergy && userAllergy.length > 0) {
      return app.tell('Okay...We will keep you safe.');
    } else {
      return app.tell('Okay..Looks like you have not got any allergy.')
    }
  }

  function addToTrolley(app) {
    let product = app.getArgument(PRODUCT_ARGUMENT);

    if (!product) return app.tell('Sorry, what product?')
    if (product.length > 1) return app.tell('Sorry we can only deal with 1 product right now')
    if (!userAllergy) return app.tell('Sorry, we do not know your allergy information yet')

    return waitroseApi.getProduct(product[0]).then(productData => {
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
        return app.tell(`${product[0]} contains ${userAllergy} would you like to hear about an alternative product?`)
      }

      return app.tell(`Okay ${product[0]} has been added to your trolley TEST`)
    }).catch(err => {
      console.error(err)
      throw err
    })
  }

  let actionMap = new Map();
  actionMap.set(PRODUCT_ACTION, addToTrolley);
  actionMap.set(ALLERGY_ACTION, saveAllergy);

  app.handleRequest(actionMap);
});
