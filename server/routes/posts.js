const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../passport');

const post_controller = require('../controllers/postController');
const comment_controller = require ('../controllers/commentController');

/* POSTS */

router.get('/', post_controller.post_list);

router.post('/', passport.authenticate('jwt', { session: false }), checkPermission, post_controller.post_post);

router.get('/:postId', post_controller.post_detail);

router.patch('/:postId', passport.authenticate('jwt', { session: false }), checkPermission, post_controller.post_update);

router.delete('/:postId', passport.authenticate('jwt', { session: false }), checkPermission, post_controller.post_delete);

/* COMMENTS */

router.get('/:postId/comments', comment_controller.get_post_comments);

router.post('/:postId/comments', passport.authenticate('jwt', { session: false }), comment_controller.post_post_comment);

router.get('/:postId/comments/:commentId', comment_controller.get_comment);

router.delete('/:postId/comments/:commentId', passport.authenticate('jwt', { session: false }), checkPermission, comment_controller.delete_comment);

// function checkAdmin(req, res, next) {
//     if (req.user.admin === false) {
//         let error = new Error(`You don't have permission to do that.`);
//         error.statusCode = 401;
//         next(error);
//     }
//     next();
// }

function checkPermission(req, res, next) {
    req.context.Comment.findById(req.params.commentId).populate('user').then(comment => {

        if (req.user._id !== comment.user.id && req.user.admin === false) {
            let error = new Error(`You don't have permission to do that.`);
            error.statusCode = 401;
            next(error);    }
        next();
    });
}

module.exports = router;