const express = require('express');
const router = express.Router();

const post_controller = require('../controllers/postController');
const comment_controller = require ('../controllers/commentController');

/* POSTS */

router.get('/', post_controller.post_list);

router.get('/:postId', post_controller.post_detail);

router.post('/:postId', post_controller.post_post);

router.put('/:postId', post_controller.post_put);

router.delete('/:postId', post_controller.post_delete);

/* COMMENTS */

router.get('/:postId/comments', comment_controller.get_post_comments);

router.post('/:postId/comments', comment_controller.post_post_comment);

router.get('/:postId/comments/:commentId', comment_controller.get_comment);

router.delete('/:postId/comments/:commentId', comment_controller.delete_comment);

module.exports = router;