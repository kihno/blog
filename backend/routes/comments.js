const express = require('express');
const router = express.Router();

/* GET comments listing. */
router.get('/:commentId', function(req, res, next) {
  res.send('GET single comment');
});

router.post('/:commentId', function(req, res, next) {
  res.send('POST new comment');
});

router.put('/:commentId', function(req, res, next) {
  res.send('PUT update comment');
});

router.delete('/:commentId', function(req, res, next) {
  res.send('DELETE single comment');
});

module.exports = router;