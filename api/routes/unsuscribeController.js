'use strict';

const UserModel = require('../models/User');

//  Unsuscribe a user removing al her adverts

class UnsuscribeController {

    async do(req, res, next) {

        try {

            const { id, token } = req.body;

            console.log('unsuscribe', req.body)

            // const user = await UserModel.findOne({ username });
            
            // if (!user) {
            //     res.json({ success: false, error: 'Invalid credentials', });
            //     return;
            // }

            // user.comparePassword(password, (error, match) => {
            //     if (!match) {
            //         res.json({ success: false, error: 'Invalid credentials', });
            //         return;
            //     }
            // });

            //save lastLogin

            res.json({ success: true,  });
            
        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new UnsuscribeController();