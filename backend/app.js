const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error'));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const connectDb = () => {
    return mongoose.connect(process.env.MONGODB_URI);
};

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
    if (eraseDatabaseOnSync) {
        await Promise.all([
            User.deleteMany({}),
            Post.deleteMany({}),
            Comment.deleteMany({})
        ]);

        createUsersWithPosts();
    }

    app.listen(4000, () => {
        console.log(`Blog app listening on port 4000`);
    });
});

const createUsersWithPosts = async () => {
    const user1 = new User({
        first_name: 'Nick',
        last_name: 'Miles',
        username: 'kihno',
        email: 'stistyle13@gmail.com',
        password: 'blackapple',
        admin: true,
    });

    const user2 = new User({
        first_name: 'Walter',
        last_name: 'Kovacs',
        username: 'Rorschach',
        email: 'utopiazolaris@gmail.com',
        password: 'crimebuster',
    });

    const post1 = new Post({
        title: 'Out with a whimper',
        body: 'The end is nigh.',
        user: user1.id,
    });

    const comment1 = new Comment({
        body: 'true that',
        user: user2.id,
        post: post1.id,
    });

    await post1.save();
    await user1.save();
    await user2.save();
    await comment1.save();
}

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    req.context = {
        User,
        Post,
        Comment,
        me: await User.findByLogin('kihno'),
    };
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// app.listen(3000, () => {
//     console.log(`Backend is listening on port 3000`);
// });

module.exports = app;
