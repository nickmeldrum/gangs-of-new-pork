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

  function ask(app, message) {
    app.ask({
      speech: message,
      displayText: message,
    });
  }

  function tell(app, message) {
    app.tell({
      speech: message,
      displayText: message,
    });
  }

  function saveAllergy(app) {
    const appAsk = ask.bind(null, app)
    userAllergy = app.getArgument(ALLERGY_ARGUMENT);

    if (userAllergy && userAllergy.length > 0) {
      return appAsk('Okay we will keep you safe, what would you like to buy?');
    } else {
      return appAsk('Okay it looks like you have not got an allergy, what would you like to buy?')
    }
  }

  function addToTrolley(app) {
    const appAsk = ask.bind(null, app)
    const appTell = tell.bind(null, app)
    let product = app.getArgument(PRODUCT_ARGUMENT);

    if (!product) return appAsk('Sorry, what product?')
    if (product.length > 1) return appAsk('Sorry we can only deal with 1 product right now')
    if (!userAllergy) return appAsk('Sorry, we do not know your allergy information yet')

    return appAsk(`we've added ${product} to your trolley, well done!`);
  }

  let actionMap = new Map();
  actionMap.set(PRODUCT_ACTION, addToTrolley);
  actionMap.set(ALLERGY_ACTION, saveAllergy);

  app.handleRequest(actionMap);
});
