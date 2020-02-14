'use strict';

const UserModel = require('../models/User');
const AdvertModel = require('../models/Advert');

//  Unsubscribe a user removing all her adverts
class unsubscribeController {

    async do(req, res, next) {

        try {

            const { id } = req.body;
            const _return = false;

            const removeAdverts = await AdvertModel.deleteMany({ owner: id });

            if (removeAdverts.ok){

                const removeUser = await UserModel.deleteMany({ _id: id });
                res.json({ success: removeUser.ok,  });
            } else {

                res.json({ success: false, });
            }

        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new unsubscribeController();