'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;
const functions = require('firebase-functions');

const NAME_ACTION = 'add_product';
const PRODUCT_ARGUMENT = 'Product';

exports.team3hackathon = functions.https.onRequest((request, response) => {
  const app = new App({request, response});

  function addToTrolley(app) {
    let product = app.getArgument(PRODUCT_ARGUMENT);
    app.tell('hey hey woohoo');
  }

  let actionMap = new Map();
  actionMap.set(NAME_ACTION, addToTrolley);

  app.handleRequest(actionMap);
});

