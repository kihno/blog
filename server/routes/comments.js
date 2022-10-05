const express = require('express');
const router = express.Router();

const comment_controller = require('../controllers/commentController');

/* GET comments listing. */
router.get('/', comment_controller.comment_list);

router.get('/:commentId', comment_controller.comment_detail);

router.post('/:commentId', comment_controller.comment_post);

router.put('/:commentId', comment_controller.comment_put);

router.delete('/:commentId', comment_controller.comment_delete);

module.exports = router;