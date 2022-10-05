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

exports.user_post = (req, res, next) => {
    res.send('POST new user');
};

exports.user_put = (req, res, next) => {
    res.send('PUT update user');
};

exports.user_delete = (req, res, next) => {
    res.send('DELETE user');
};