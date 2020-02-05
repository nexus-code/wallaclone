'use strict';

const User = require('../models/User');

// Authenticate access to API

class LoginController {


    /* 
    * Get user credentials ({username, password})
    * via POST and authenticate
    */

    async login(req, res, next) {

        // console.log('LoginController.login', req.headers);

        try {

            const { username, password } = req.body;

            const user = await User.findOne({ username });
            
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

            const packData = user.packData(user);

            res.json({ success: true, token: packData.token, result: packData });
        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new LoginController();