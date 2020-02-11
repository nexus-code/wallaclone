'use strict';

const UserModel = require('../models/User');
const AdvertModel = require('../models/Advert');

//  Unsuscribe a user removing al her adverts

class UnsuscribeController {

    async do(req, res, next) {

        try {


            const { id, token } = req.body;

            console.log('unsuscribe', req.body)

            const removeAdverts = await AdvertModel.deleteMany({ owner: id }, function (err) {});
            const removeUser = await UserModel.findOneAndDelete({ _id: id });

            console.log('removeAdverts', removeAdverts);
            console.log('removeUser', removeUser);


            res.json({ success: true,  });
            
        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new UnsuscribeController();