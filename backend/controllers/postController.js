
const Posts = require('../models/post');

exports.post_list = (req, res, next) => {
    return res.send(Object.values(Posts));
};

exports.post_detail = (req, res, next) => {
    return res.send(Posts[req.params.postId]);
};

exports.post_post = (req, res, next) => {
    res.send('POST new post');
};

exports.post_put = (req, res, next) => {
    res.send('PUT update post');
};

exports.post_delete = (req, res, next) => {
    res.send('DELETE post');
};