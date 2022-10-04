// const async = require('async');
// const passport = require('passport');
// const bcrypt = require('bcryptjs');
// const { body, validationResult } = require('express-validator');

const Users = require('../models/user');
const Posts = require('../models/post');
const Comments = require('../models/comment');

exports.user_list = (req, res, next) => {
    return res.send(Object.values(Users));
};

exports.user_detail = (req, res, next) => {
    return res.send(Users[req.params.userId]);
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
