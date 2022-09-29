const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('GET users');
});

router.get('/:userId', function(req, res, next) {
  res.send('GET single user');
});

router.post('/:userId', function(req, res, next) {
  res.send('POST new user');
});

router.put('/:userId', function(req, res, next) {
  res.send('PUT update user');
});

router.delete('/:userId', function(req, res, next) {
  res.send('DELETE single user');
});

module.exports = router;
