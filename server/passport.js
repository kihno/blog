const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const User = require('./models/user');

passport.use('local', new LocalStrategy(
    {
        username: 'username',
        password: 'password'
    }, 
    function (username, password, cb) {

    return User.findOne({username})
        .then(user => {
            if (!user) {
                return cb(null, false, {message: 'User not found.'});
            }

            const validate = user.isValidPassword(password);

            if (!validate) {
            return done(null, false, { message: 'Password is incorrect.' });
            }

            return cb(null, user, {message: 'Logged In Successfully'});
        })
        .catch(err => cb(err));
    }
));

passport.use('jwt', new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    },
    function(jwtPayload, cb) {
        return User.findById(jwtPayload.id)
        .then(user => {
            return cb(null, jwtPayload.user);
        })
        .catch(err => {
            return cb(err);
        });
    }
));