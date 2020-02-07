'use strict';

const User = require('../models/User');

// Recover password

class recoverPasswdController {


    async recover(req, res, next) {

        // FROM LOGIN
        // try {

        //     const { username, password } = req.body;

        //     const user = await User.findOne({ username });
            
        //     if (!user) {
        //         res.json({ success: false, error: 'Invalid credentials', });
        //         return;
        //     }

        //     user.comparePassword(password, (error, match) => {
        //         if (!match) {
        //             res.json({ success: false, error: 'Invalid credentials', });
        //             return;
        //         }
        //     });

        //     const packData = user.packData(user);

        //     res.json({ success: true, token: packData.token, result: packData });
        // } catch (err) {
            
        //     next(err);
        // }
    }
}

module.exports = new recoverPasswdController();