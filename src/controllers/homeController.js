const router = require("express").Router();
const catchExceptions = require("../middleware/catchExceptions");

router.get('/', catchExceptions(async (req, res) => {
  res.redirect('/login');
}));

module.exports = router;