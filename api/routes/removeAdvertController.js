'use strict';

const AdvertModel = require('../models/Advert');

//  Remains remove images & ¿notify via email?

class RemoveAdvertController {

    async do(req, res, next) {

        try {

            console.log('RemoveAdvertController', req.body)
            const { data } = req.body;

            const removeAdvert = await AdvertModel.findOneAndDelete({ _id: data });

            res.json({ success: true,  });
            
        } catch (err) {
            
            next(err);
        }
    }
}

module.exports = new RemoveAdvertController();