const Twit = require('twit');
const twitConfig = require('../../twitConfig');
const twit = Twit(twitConfig);
const { TwitterUser } = require('../models');
const TwitterService = require('./TwitterService');

const twitterService = new TwitterService(twit, TwitterUser);

module.exports = {
  twitterService
};
