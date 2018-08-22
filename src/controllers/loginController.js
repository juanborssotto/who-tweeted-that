const router = require("express").Router();
const { twitterService } = require('../services');
const catchExceptions = require("../middleware/catchExceptions");

router.get('/', catchExceptions((req, res) => {
  res.render('login/login');
}));

/**
* Query params:
*   - text: What to search
*   - count: Max amount of matches in the response
* Returns: Json with an array of matched users
*/
router.get('/match-users', catchExceptions(async (req, res) => {
  const users = await 
      twitterService.getUsers(req.query.text, req.query.count);
  res.render('login/usersList', {layout: false, users});
}));

module.exports = router;