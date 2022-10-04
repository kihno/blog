
const Comments = require('../models/comment');

exports.comment_list = (req, res, next) => {
    return res.send(Object.values(Comments));
};

exports.comment_detail = (req, res, next) => {
    return res.send(Comments[req.params.commentId]);
};

exports.comment_post = (req, res, next) => {
    res.send('comment new comment');
};

exports.comment_put = (req, res, next) => {
    res.send('PUT update comment');
};

exports.comment_delete = (req, res, next) => {
    res.send('DELETE comment');
};