
exports.post_list = async (req, res, next) => {
    const posts = await req.context.Post.find().catch((error) => {
        error.statusCode = 400;
        next(error);
    });

    return res.send(posts);
};

exports.post_detail = async (req, res, next) => {
    const post = await req.context.Post.findById(req.params.postId).catch((error) => {
        error.statusCode = 400;
        next(error);
    });
    
    return res.send(post);
};

exports.post_post = async (req, res, next) => {
    console.log(req.context.me);
    const post = await req.context.Post.create({
        title: req.body.title,
        text: req.body.text,
        user: req.context.me.id,
    }).catch((error) => {
        error.statusCode = 400;
        next(error);
    });
    
    return res.send(post);
};

exports.post_update = async (req, res, next) => {
    try {
        const updatedPost = {
            title: req.body.title,
            text: req.body.text,
            user: req.context.me.id,
        };
    
        const result = await req.context.Post.findByIdAndUpdate(req.params.postId, updatedPost, {new: true});
        res.send(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.post_delete = async (req, res, next) => {
    const post = await req.context.Post.findById(req.params.postId).catch((error) => {
        error.statusCode = 400;
        next(error);
    });

    if (post) {
        await post.remove();
    }

    return res.send(post);
};