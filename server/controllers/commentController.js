const async = require('async');
const { body, validationResult } = require('express-validator');

const Comment = require('../models/comment');

exports.get_post_comments = (req, res, next) => {
    req.context.Comment.find({ post: req.params.postId })
    .populate('user')
    .sort({ timestamp: -1 })
    .exec(function (err, comments) {
        if (err) {
            return next(err);
        }

        res.send(comments);
    });
};

exports.post_post_comment = [

    body('text', 'Comment cannot be empty.')
    .trim()
    .isLength({ min: 1 })
    .blacklist('<>'),

    (req, res, next) => {
        const errors = validationResult(req);

        console.log(req.context.me);

        const comment = new Comment({
            text: req.body.text,
            user: req.user,
            post: req.params.postId
        });

        if (!errors.isEmpty()) {
            req.context.Comment.find({ post: req.params.postId })
            .sort({ timestamp: -1 })
            .exec(function (err, comments) {
                if (err) {
                    return next(err);
                }

                return res.send(comments);
            });
        }

        comment.save((err) => {
            if (err) {
                console.log(err);
                return next(err)
            }
            
            return res.send(comment);
        });
    },
];

exports.get_comment = async (req, res, next) => {
    const comment = await req.context.Comment.findById(req.params.commentId);
    return res.send(comment);
};

exports.delete_comment = (req, res, next) => {
    req.context.Comment.findByIdAndRemove(req.params.commentId, (err) => {
        if (err) { return next(err) }

        res.status(204).send({});
    });
};