// const async = require('async');
// const passport = require('passport');
// const bcrypt = require('bcryptjs');
// const { body, validationResult } = require('express-validator');

// const User = require('../models/user');
// const Post = require('../models/post');
// const Comment = require('../models/comment');

exports.user_list = async (req, res, next) => {
    const users = await req.context.User.find();
    return res.send(users);
};

exports.user_detail = async (req, res, next) => {
    const user = await req.context.User.findById(req.params.userId).catch((error) => {
        error.statusCode = 400;
        next(error);
    });
    
    return res.send(user);
};

exports.user_post = async (req, res, next) => {
    const newUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    };

    const emailTaken = await req.context.User.findOne({ email: newUser.email });
    const usernameTaken = await req.context.User.findOne({ username: newUser.username });

    if (emailTaken) {
        let error = new Error(`Email is already in use.`);
        error.statusCode = 401;
        error.name = 'emailError'
        next(error);
    } else if (usernameTaken) {
        let error = new Error(`Username not available.`);
        error.statusCode = 401;
        error.name = 'usernameError'
        next(error);
    } else {
        await req.context.User.create(newUser);

        return res.send(newUser);
    }

    // const user = await req.context.User.create({
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.password,
    // });
    
    // return res.send(user);
};

exports.user_update = async (req, res, next) => {
    const updatedUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        id: req.params.userId
    }

    const emailTaken = await req.context.User.findOne({ email: updatedUser.email });
    const usernameTaken = await req.context.User.findOne({ username: updatedUser.username });

    if (emailTaken && emailTaken.id != updatedUser.id) {
        console.log(updatedUser.id);
        console.log(emailTaken.id);
        let error = new Error(`Email is already in use.`);
        error.statusCode = 401;
        error.name = 'emailError'
        next(error);
    } else if (usernameTaken && usernameTaken.id != updatedUser.id) {
        let error = new Error(`Username not available.`);
        error.statusCode = 401;
        error.name = 'usernameError'
        next(error);
    } else {
        const result = await req.context.User.findByIdAndUpdate(req.params.userId, updatedUser, {new: true});
    
        return res.send(result);
    }
};

exports.user_delete = async (req, res, next) => {
    const user = await req.context.User.findById(req.params.userId);

    if (user) {
        await user.remove();
    }

    return res.send(user);
};