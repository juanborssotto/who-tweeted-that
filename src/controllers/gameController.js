const router = require("express").Router();
const { twitterService } = require('../services');
const catchExceptions = require("../middleware/catchExceptions");

/**
* Query params:
*   - nextQuestion: If received, renders a partial page with HTML to define
*     the next question. If not, returns the full page with the 1st question.
*/
router.get('/user/:userId', catchExceptions(async (req, res) => {
  if(req.query.nextQuestion == undefined)
    req.session.userId = req.params.userId;
  const randomFriends = await
    twitterService.getRandomFriends(req.session.userId, 100, 3);
  const correctAnswerFriendId = 
    randomFriends[Math.floor(Math.random() * randomFriends.length)].id;
  req.session.correctAnswer = correctAnswerFriendId;
  const randomTweet = await
    twitterService.getRandomTweet(correctAnswerFriendId, 100);
  if(req.query.nextQuestion == undefined) {
    const user = await
      twitterService.getUserById(req.params.userId);
    res.render('game/game', 
      {'user': user, 'friends': randomFriends, 'tweet': randomTweet});
  }
  else
    res.render('game/newQuestion', 
      {layout: false, 'friends': randomFriends, 'tweet': randomTweet});
}));

/**
* Post params:
*   - answer: Id of the twitter user the player chose.
*/
router.post('/answer', catchExceptions(async (req, res) => {
  (req.body.answer == req.session.correctAnswer) ?
    res.json({'result': 1}) : 
    res.json({'result': 0, 'correctAnswer': req.session.correctAnswer});
}));

module.exports = router;