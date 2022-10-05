var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const user =  await req.context.Users.findById(req.contxt.me.id);
  return res.send(user);
});

module.exports = router;
