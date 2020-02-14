'use strict';

const UserModel = require('../models/User');

// Authenticate access to API

class LoginController {


    /* 
    * Get user credentials ({username, password})
    * via POST 
    */

    async login(req, res, next) {

        try {

            const { username, password } = req.body;

            const user = await UserModel.findOne({ username });
            
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

            //save lastLogin to be done

            const packData = user.packData(user);
            res.json({ success: true, token: packData.token, result: packData });
            
        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new LoginController();