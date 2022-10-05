
exports.comment_list = (req, res, next) => {
    res.send('GET all comments');
};

exports.comment_detail = async (req, res, next) => {
    const comment = await req.context.Comment.findbyId(req.params.commentId);
    return res.send(comment);
};

exports.comment_post = async (req, res, next) => {
    const comment = await req.context.Post.create({
        title: req.body.title,
        body: req.body.text,
        user: req.context.me.id,
    });
    
    return res.send(post);
};

exports.comment_put = (req, res, next) => {
    res.send('PUT update comment');
};

exports.comment_delete = (req, res, next) => {
    res.send('DELETE comment');
};