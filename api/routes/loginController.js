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
        try {

            // get credentials
            const email = req.body.email;
            const password = req.body.password;

            // find user on DB
            const user = await User.findOne({ email: email });

            // user not exits
            if (!user || !await bcrypt.compare(password, user.password)) {
                res.json({ success: false, error: 'Invalid credentials' });
                return;
            }

            // create JWT
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES
            });

            res.json({ success: true, token: token });
        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new LoginController();