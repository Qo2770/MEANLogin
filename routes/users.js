const express = require('express');

const router = express.Router();

// Register
router.get('/register', (req, res, next) => {
    res.send('Register');
    next();
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    res.send('Authenticate');
    next();
});

// Profile
router.get('/profile', (req, res, next) => {
    res.send('Profile');
    next();
});

// Validate
router.get('/validate', (req, res, next) => {
    res.send('Validate');
    next();
});

module.exports = router;