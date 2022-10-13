const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();

const User = require('./models/user');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
   User.findById(id).then((user) => {
    done(null, user)
   }); 
});

passport.use('local', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password'
    }, 
    function (username, password, done) {

    return User.findOne({username})
        .then(user => {
            if (!user) {
                return done(null, false, {message: 'User not found.'});
            }

            const validate = user.isValidPassword(password);

            if (!validate) {
            return done(null, false, { message: 'Password is incorrect.' });
            }

            return done(null, user, {message: 'Logged In Successfully'});
        })
        .catch(err => done(err));
    }
));

passport.use('jwt', new JWTStrategy(
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    },
    function(jwtPayload, done) {
        User.findById(jwtPayload.id)
        .then(user => {
            return done(null, jwtPayload.user);
        })
        .catch(err => {
            return done(err);
        });
    }
));