'use strict';

/**
 * AdvertSchema: Advert definition
 * 
 * Use mongoose to store data
 * Use cote to store advert image (via microservice)
 * 
 * Export Advert (with CRUD methods)
 */

const mongoose = require('mongoose');
const advertSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 4,
        maxlength: 50,
        trim: true,
    },
    type: {
        // true for sale, false for search 
        type: Boolean,
        require: true,
    },
    price: {
        type: Number,
        require: true,
        min: 0,
    },
    image: {
        type: String,
    },
    tags: {
        type: [String],
        require: true,
    },
    active: {
        // 0 sold or found
        type: Boolean,
        default: true,
    },
    description: {
        type: String,
        minlength: 0,
        maxlength: 500,
    }
});

advertSchema.index({ name: 1, type: 1, price: -1, active: 1});

/**
 * advert image microservice
 */
const cote = require('cote');

const requesterImageService = (advert) => {

    const requester = new cote.Requester({ name: 'image.requester' });

    console.log('requesterImageService');

    requester.send({
        type: 'image.service',
        file: advert.image,
        widths: process.env.IMG_ADvert_SIZES,
    }, response => {
        console.log(`image.service: move & resized ${advert.image} for: ${advert.name} `);
    });
}


/** 
 * Averts Methods
 */

// insert a document
advertSchema.statics.insert = async function (req, res, next) {
    try {
        console.log('-- adverts.js insert advert: ', req.body);

        // data
        const data  = req.body;
        const advert    = new Advert(data);
        const newAdvert = await advert.save();

        requesterImageService(newAdvert);

        return newAdvert

    } catch (err) {
        next(err);
    }
}

// update a document
advertSchema.statics.updateAdvert = async function (id, data, next) {
     try {

         const updatedAdvert = await Advert.findOneAndUpdate({_id: id}, data, {new: true});

        //  console.log('-- adverts.js update: ', updatedAdvert);

         return updatedAdvert;

     } catch (err) {
         next(err);
     }
 }
 
// delete a advert document
advertSchema.statics.delete = async function (_id, next) {
    try {

         await Advert.deleteOne({_id}).exec;

        // console.log('-- adverts.js delete: ', _id);

        return 200;

    } catch (err) {
        next(err);
    }
}

advertSchema.statics.tagsList = function () {
    // removed params req, res, next
    
    const query = Advert.distinct("tags");
    return query.exec();
};


// making the query:
// get url params via router
// return query adverts via quey
//advertSchema.statics.select = async function (req, res, next) {
advertSchema.statics.select = async function (req) {

    /** 
     * I move the search filtering to the model to gather all the logic of the class and avoid duplicate code.
     */   

    // params in querystring. Must be objects for mongo. Schema filter 'typeof them'
    const id = req.query.id;
    const name = req.query.name;
    const type = req.query.type;
    const active = req.query.active;
    const text = req.query.text;
    const tags = req.query.tags;
    const price = req.query.price;

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort || 'price'; // sort price by default

    let filter = {};

    if (id) {
        filter._id = id;
    }

    if (name) {
        // 3. name   -> Starts with value
        filter.name = new RegExp('^' + name, "i");
    }

    if (type) {
        filter.type = type;
    }

    filter.active = active === undefined ? true : active;

    // Let's see if I have time.
    // Full text search in name & description, compound text index 
    // add description field to collection
    if (text) {
        filter = Object.assign(filter, {$text: {$search: text}});
    }

    if (price) {
        /**5. Price                         ->      price.split('-')
            a. X: exact value                            [X]
            b. Y-X:  Y <= ads.price <= X               [X , Y]
            c. X- :  ads.price <= X                    [X , ''] 
            d. -X :  X <= ads.price                    ['' , X]
        */

        const vPrice = price.split('-');

        if (vPrice.length == 1) {

            filter.price = price; // [X]
        } else {

            if (vPrice[0] != '' && vPrice[1] != '') {

                filter.price = {
                    $gte: vPrice[0],
                    $lte: vPrice[1]
                }; // [X , Y]
            } else {

                if (vPrice[1] == '')
                    filter.price = {
                        $gte: vPrice[0]
                    }; // [X , ''] 
                if (vPrice[0] == '')
                    filter.price = {
                        $lte: vPrice[1]
                    }; // ['' , X]
            }
        }
    }

    if (tags) {
        // tags is a comma-separated string; split converts it to array
        filter.tags = {
            $in: tags.split(',')
        }
    }

    const adverts = await list({filter, skip, limit, fields, sort});
    // console.log('       - Query filter: ', filter);
    // console.log('       - Query results count: ', adverts.length);

    return adverts;          
};

    
// return query predefinition
// advertSchema.statics.list = function ({filter, skip, limit, fields, sort}) {
function list ({filter, skip, limit, fields, sort}) {
    const query = Advert.find(filter); 
    query.skip(skip).limit(limit).select(fields).sort(sort);
    return query.exec();
};


const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert; 