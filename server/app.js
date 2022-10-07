const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./passport');

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error'));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const auth = require('./routes/auth');

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
});

const createUsersWithPosts = async () => {
    const user1 = new User({
        username: 'kihno',
        email: 'stistyle13@gmail.com',
        password: 'blackapple',
        admin: true,
    });

    const user2 = new User({
        username: 'Rorschach',
        email: 'utopiazolaris@gmail.com',
        password: 'crimebuster',
    });

    const post1 = new Post({
        title: 'Out with a whimper',
        text: 'The end is nigh.',
        user: user1.id,
    });

    const comment1 = new Comment({
        text: 'true that',
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
app.use(express.urlencoded({ extended: true }));
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
app.use('/auth', auth);

app.get('*', function(req, res, next) {
    const error = new Error(
        `${req.ip} tried to access ${req.originalUrl}`,
    );

    error.statusCode = 301;

    next(error);
})

app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;

    if (error.statusCode === 301) {
        return res.status(301).redirect('/not-found');
    }

    return res
    .status(error.statusCode)
    .json({ error: error.toString() });
});

function authenticateToke(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];

    if( token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});

module.exports = app;
