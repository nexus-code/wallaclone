'use strict';

const AdvertModel = require('../models/Advert');

//  Remains remove images & ¿notify via email?

class RemoveAdvertController {

    async do(req, res, next) {

        try {

            const { data } = req.body;
            const removeAdvert = await AdvertModel.deleteMany({ _id: data });
           
            res.json({ success: removeAdvert.ok, });

        } catch (err) {
            console.log('RemoveAdvertController', err);
            
            next(err);
        }
    }
}

module.exports = new RemoveAdvertController();