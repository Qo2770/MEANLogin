// Dependencies
const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const router = express.Router();

// Register
router.post('/register', (req, res, next) => {

    // Get form data and insert into new User obj
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    // Add user and detect any errors
    User.addUser(newUser, (err, user) => {
        if(err) {
            res.json({ success: false, msg: 'Registration failed!' });
        } else {
            res.json({ success: true, msg: 'Registration succeeded!' });
        }
    });

});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // Find and authenticate user
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user) {
            // not matching user found
            return res.json({ success: false, msg: "Invalid username!" });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch) {
                // Create token with secret
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 259200 // 3 days
                });

                // If successful, return token and user info (without password) to front-end
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                // invalid password
                return res.json({ success: false, msg: "Incorrect password!" });
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user });
});

module.exports = router;