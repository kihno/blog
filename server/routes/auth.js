const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');

/* POST Login */

router.post('/', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: err.message,
                user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign({user: user}, process.env.SECRET_KEY, {expiresIn: 3600});
            const authUser = {admin: user.admin, id: user.id, username: user.username}
            return res.json({token, authUser});
        });
    })(req, res);
});

module.exports = router;