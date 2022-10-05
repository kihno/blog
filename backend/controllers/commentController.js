
exports.comment_list = (req, res, next) => {
    res.send('GET all comments');
};

exports.comment_detail = async (req, res, next) => {
    const comment = await req.context.Comment.findbyId(req.params.commentId);
    return res.send(comment);
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