'use strict';

const fs = require('fs');
const config = require('config');
const Twit = require('twit');

function parseTweets(tweets) {
  const parsedTweets = tweets.map((tweet) => {
    const text = tweet.text.replace('\n\n', '<break time="1500ms"/>');

    return {
      id: tweet.id_str,
      text: text,
      created_at: tweet.created_at
    }
  });

  writeToFile(parsedTweets);
}

function writeToFile(tweets) {
  fs.writeFileSync(`./jokes.json`, JSON.stringify(tweets));
}

function getTweets() {
  const T = new Twit(config.get('twit_config'));
  const opts = {
    screen_name: 'kidswritejokes',
    count: 350
  };

  T.get('statuses/user_timeline', opts, (err, tweets) => {
    if (err) return console.log(err);

    parseTweets(tweets);
  });
}

getTweets();