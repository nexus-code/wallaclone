'use strict';

const UserModel = require('../models/User');
const AdvertModel = require('../models/Advert');

//  unsubscribe a user removing al her adverts

class unsubscribeController {

    async do(req, res, next) {

        try {


            const { id } = req.body;

            console.log('unsubscribe', req.body)

            const removeAdverts = await AdvertModel.deleteMany({ owner: id }, function (err) {});
            // Remains remove images & ¿notify via email ?
            
            const removeUser = await UserModel.deleteMany({ _id: id }, function (err) { });

            console.log('removeAdverts', removeAdverts);
            console.log('removeUser', removeUser);


            res.json({ success: true,  });
            
        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new unsubscribeController();