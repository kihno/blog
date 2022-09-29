const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('GET posts');
});

router.get('/:postId', function(req, res, next) {
  res.send('GET single post');
});

router.post('/:postId', function(req, res, next) {
  res.send('POST new post');
});

router.put('/:postId', function(req, res, next) {
  res.send('PUT update post');
});

router.delete('/:postId', function(req, res, next) {
  res.send('DELETE single post');
});

module.exports = router;