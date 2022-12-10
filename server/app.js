const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');

require('dotenv').config();
require('./passport');

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

        // createUsersWithPosts();
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
        username: 'rorschach',
        email: 'utopiazolaris@gmail.com',
        password: 'crimebuster',
    });

    const post3 = new Post({
        title: "Li's Field",
        text: `Hong Kong has never been hit by a tropical cyclone because Li Ka-shing built a top secret force field to protect this city.

        You might be wondering why this is, but the truth is that no one knows the reason for Li's success—not even him. But we do know that he built the force field around Hong Kong in order to keep out Mother Nature, who just doesn't understand how much Li loves his city.
        
        The truth is that Li Ka-shing has been protecting Hong Kong since before it was even a city! Li wanted to create a place where people could live happily and peacefully—a place free of diseases and natural disasters. And he did just that: he built his own force field around Hong Kong when it was still just a small fishing village called Shek Kip Mei! But even then, he knew there was more work to be done: so he began building his force field around Hong Kong again as we know it today.
        
        The force field was created in 2008, and it's a series of powerful lasers that shoot out of the ground, creating a protective barrier around Hong Kong. The force field has kept the city safe from typhoons and other natural disasters ever since its creation—and it will continue to do so for years to come!`,
        user: user1.id,
    });

    const post2 = new Post({
        title: 'This City Does Not Exist',
        text: `Have you ever heard of the city of Bielfeld, Germany? Of course you have, who hasn't? Want to know the truth? This city does not exist. People think it exists, but it is government conspiracy to cover up top secret experiments.
  
        The city was built around a strange and mysterious group of underground tunnels that were discovered by accident when construction workers digging a new road tunnel accidentally hit the entrance to this underground town. The tunnel was sealed off immediately and has remained so ever since, with no one allowed inside or out without express permission from the federal government.
        
        In the early 1900s, the German government initiated a top-secret experiment involving the creation of a city in a remote part of the country. The goal was to study how people would react to living in an environment that had been altered from what they were used to, so that they could better prepare for wars and other disasters.
        
        The city was built using only materials that could be found within Germany. It was surrounded by tall walls and barbed wire fences, with no access allowed through or around them. Only select individuals were allowed inside this "city," including scientists and other officials who were sent there to observe its inhabitants' behavior.
        
        The people who live in this city are known as "Bielfelders", and they tend to be very friendly, even though everyone knows that they're not real people at all. They're just part of a larger conspiracy by our government to hide what's really going on in this world from us regular people who don't have any special powers or abilities that could help us out if something bad were to happen in space or another dimension or something like that (which we know would happen eventually because the universe is expanding).
        
        Although it is widely believed that this city does exist, we believe this is actually a cover-up for some very important scientific experiments being conducted by the German government right now. We urge you to join us in our quest for truth and transparency!`,
        user: user1.id,
    });

    const post1 = new Post({
        title: "Are Bird's Real?",
        text: `We've been thinking about this one lately. Is it possible that birds are real? It seems like everyone has seen them at some point in their lives - but what if there's something more to it? What if these birds aren't exactly what we think they are?
        
        Birds are a very recent invention. The word "bird" comes from the German word "perch", which means to perch on something. Birds were originally called "birds" because they lived in trees and perched on them.
        
        Because of this, there is no physical evidence that birds exist outside of the imagination of humans like you and me—or at least anyone else who has ever seen a live one!
        
        Many people have claimed to have personally seen some kind of bird, but when confronted with proof, they are unable to recall details. If you've ever claimed to have seen something, it's likely that other things have been claimed as well. For example, if you say that you saw a bird and then say that there are unicorns in existence, people will be more willing to believe your story because they don't want to seem crazy or get their heads chopped off.
        
        Similarly, if someone says they saw an alien and also claims to have seen Bigfoot (or whatever), no one will question his sanity because everyone knows about aliens and Bigfoot. But if he just mentions seeing something strange in the woods behind his house—a ghost maybe?—that would sound like crazy nonsense!
        
        We're not saying that birds aren't real, but we definitely think it's interesting how many people have claimed otherwise. There are plenty of other animals out there that can be seen with our own eyes and documented as real, so why do people still believe in birds? We guess you'll just have to decide for yourself!`,
        user: user1.id,
    });

    const comment3 = new Comment({
        text: 'This makes so much sense. Thanks for bringing this to my attention.',
        user: user2.id,
        post: post3.id,
    });

    const comment2 = new Comment({
        text: 'Wow this blew my mind. Keep up the good work bud.',
        user: user2.id,
        post: post2.id,
    });

    const comment1 = new Comment({
        text: "You make some interesting points. I'm going to run some experiments later 2day will keep you updated.",
        user: user2.id,
        post: post1.id,
    });

    await user1.save();
    await user2.save();
    await post1.save();
    await post2.save();
    await post3.save();
    await comment1.save();
    await comment2.save();
    await comment3.save();
}

const app = express();

app.use(cors({
    origin: 'https://blog-frontend-alm2.onrender.com',
    credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    maxAge:24 * 60 * 60 * 1000,
    keys: [process.env.SECRET_KEY]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(async (req, res, next) => {
    req.context = {
        User,
        Post,
        Comment,
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

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`)
});

module.exports = app;
