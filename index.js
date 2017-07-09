'use strict';

const Alexa = require('alexa-sdk');
const jokes = require('./jokes');

const APP_ID = 'amzn1.ask.skill.f8b6b21d-5b1d-479d-8f3b-cc9153159ba3';

function randomInt() {
  return Math.floor(Math.random() * jokes.length)
}

const handlers = {
  'LaunchRequest': function () {
    this.emit('TellAJokeIntent');
  },
  'TellAJokeIntent': function() {
    const jokeIndex = randomInt();
    const joke = jokes[jokeIndex];
    this.emit(':tell', joke.text);
  },
  'AMAZON.StopIntent': function () {
    this.emit(':tell', 'Bye!');
  }
};

module.exports.handler = (event, context, callback) => {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};
