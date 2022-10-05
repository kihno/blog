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
    const user = await req.context.User.findbyId(req.params.userId);
    return res.send(user);
};

exports.user_post = async (req, res, next) => {
    const user = await req.context.User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });
    
    return res.send(user);
};

exports.user_put = async (req, res, next) => {
    const updatedUser = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    }
    
    const result = await req.context.User.findByIdAndUpdate(req.params.id, updatedUser);
    
    return res.send(result);
};

exports.user_delete = async (req, res, next) => {
    const user = await req.context.User.findById(req.params.userId);

    if (user) {
        await user.remove();
    }

    return res.send(user);
};