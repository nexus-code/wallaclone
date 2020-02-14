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
const moment = require('moment');

const advertSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    type: {
        type: String,
        require: true,
        default: 'sell'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        require: true,
        min: 0,
    },
    image: {
        type: String,
        default: ''
    },
    tags: {
        type: [String],
        require: true,
    },
    status: {
        type: String,
        require: true,
        default: ''
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
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date }    
});

advertSchema.index({ name: 1, type: 1, price: -1, active: 1, created: 1});

advertSchema.pre("find", function () {

    this.populate('owner', { username: 1, language: 1 });
});

/**
 * advert image microservice
 */
const cote = require('cote');

const requesterImageService = async (advert) => {

    const requester = new cote.Requester({ name: 'image.requester' });

    console.log('requesterImageService');
    console.log('advert.image', advert.image);

    requester.send({
        type: 'image.service',
        file: advert.image,
    }, response => {
        console.log(`image.service: move & resized ${advert.image} for: ${advert.name} `);
    });
}

const parseUplodadImage = (fileObj) => {


}
 

/** 
 * Adverts CRUD Methods
 */

advertSchema.statics.insert = async function (req, next) {
    try {

        const data  = req.body;

        // if(data.imageFile != {}){

        // }

        const advert    = new Advert(data);
        const newAdvert = await advert.save();


        await requesterImageService(newAdvert);

        return newAdvert

    } catch (err) {
        next(err);
    }
}

advertSchema.statics.update = async function (req, next) {
     try {

        //  console.log('update BODY : ', req.body);
         console.log('update FILE: ', req.file);

// update FILE:  { fieldname: 'imageFile',
//   originalname: 'ama-dablam-2064522_640.jpg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   destination: 'uploads',
//   filename: '1581704702164_ama-dablam-2064522_640.jpg',
//   path: 'uploads\\1581704702164_ama-dablam-2064522_640.jpg',
//   size: 81119 }

         const hasFile = req.file !== undefined;

        const data = req.body;
        data.image = hasFile ? req.file.filename : '';

        data.updated = moment();

        const updatedAdvert = await Advert.findOneAndUpdate({ _id: data.id }, data, {new: true});

         if (hasFile){

             await requesterImageService(req.file);
         }

         return updatedAdvert;

     } catch (err) {

         console.log('update ERROR: ', err);

         next(err);
     }
 }
 
advertSchema.statics.delete = async function (_id, next) {
    try {


        await Advert.deleteOne({_id}).exec;

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
    const created = req.query.created;

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit) || parseInt(process.env.ADVERT_PAGINATION_LIMIT);   
    const fields = req.query.fields;
    
    // const sort = req.query.sort || { 'created': -1 }; // sort created by default
    const sort = { 'created': -1 }; // sort created by default

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
    console.log('       - Query filter: ', filter);
    // console.log('       - Query result count: ', adverts.length);

    return adverts;          
};

    
// return query predefinition
// advertSchema.statics.list = function ({filter, skip, limit, fields, sort}) {
function list ({filter, skip, limit, fields, sort}) {
    
    //v1
    const query = Advert.find(filter); 

    //v3
    // const query = Advert.find(filter).populate('owner');

   
    // console.log('       - Query: ', query);

    query.skip(skip).limit(limit).select(fields).sort(sort);
    return query.exec();
};



const Advert = mongoose.model('Advert', advertSchema);

module.exports = Advert; 