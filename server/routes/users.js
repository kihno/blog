const express = require('express');
const router = express.Router();
const passport = require('passport');

const user_controller = require('../controllers/userController');

router.get('/', user_controller.user_list);

router.post('/', user_controller.user_post);

router.get('/:userId', user_controller.user_detail);

router.patch('/:userId', passport.authenticate('jwt', { session: false }), checkPermission, user_controller.user_update);

router.delete('/:userId', passport.authenticate('jwt', { session: false }), checkPermission, user_controller.user_delete);

function checkPermission(req, res, next) {
    req.context.User.findById(req.params.userId).then(user => {
        if (user.id !== req.user._id && req.user.admin === false) {
            let error = new Error(`You don't have permission to do that.`);
            error.statusCode = 401;
            next(error);    }
        next();
    });
}

module.exports = router;
