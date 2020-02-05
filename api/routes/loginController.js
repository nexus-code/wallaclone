'use strict';
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Authenticate access to API

class LoginController {


    /* 
    * Get user credentials via POST and authenticate
    */

    async loginJWT(req, res, next) {

        console.log('loginJWT', req.headers);

        try {

            // get credentials
            const username = req.body.username;
            const password = req.body.password;

            // find user on DB
            const user = await User.findOne({ username: username });
            
            // user not exits
            // if (!user || !await bcrypt.compare(password, user.password)) {
            if (!user) {
                res.json({ success: false, error: 'Invalid credentials', });
                return;
            }

            user.comparePassword(password, (error, match) => {
                if (!match) {
                    res.json({ success: false, error: 'Invalid credentials', });
                    return;
                }
            });

            // create JWT
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });

            // only returns necessary  user information
            const returnedUser = {
                _id: user._id,
                token: token,
                username: user.username,
                email: user.email,
                language: user.language,
            }

            res.json({ success: true, token: token, result: returnedUser });
        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new LoginController();