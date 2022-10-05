
exports.post_list = async (req, res, next) => {
    const posts = await req.context.Post.find();
    return res.send(posts);
};

exports.post_detail = async (req, res, next) => {
    const post = await req.context.Post.findById(req.params.postId);
    return res.send(post);
};

exports.post_post = async (req, res, next) => {
    const post = await req.context.Post.create({
        title: req.body.title,
        body: req.body.text,
        user: req.context.me.id,
    });
    
    return res.send(post);
};

exports.post_put = async (req, res, next) => {
    const updatedPost = {
        title: req.body.title,
        body: req.body.text,
        user: req.context.me.id,
    };

    const result = await req.context.Post.findByIdAndUpdate(req.params.id, updatedPost);
    
    return res.send(result);
};

exports.post_delete = async (req, res, next) => {
    const post = await req.context.Post.findById(req.params.postId);

    if (post) {
        await post.remove();
    }

    return res.send(post);
};