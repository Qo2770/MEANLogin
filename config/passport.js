// Dependencies
const JWTStratagey = require('passport-jwt').Strategy;
const JWTExtractor = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

// Configure jwt tokens and use passport-jwt Strategy
module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = JWTExtractor.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JWTStratagey(opts, (jwt_payload, done) => {
        User.getUserById(jwt_payload.data._id, (err, user) => {
            // If an error occurred, return with error
            if(err) {
                return done(err, false);
            }

            // If user is found, return him, else return false
            if(user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}

