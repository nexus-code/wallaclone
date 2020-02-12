/**
 * Wallaclone API
 * Methods to use API and search adverts
 * v2:
 * - Authentication access
 * - Handle image (upladed with multer in app.js) with microservice with cote 
 */
'use strict';

const express = require('express');
const router  = express.Router();

const Advert = require('../../models/Advert');

/**
 * advert Routes
 */

// GET /adverts -> List adverts
router.get('/', async (req, res, next) => {
    try {

        const adverts = await Advert.select(req);

        res.json({
            status: 200,
            result: adverts
        }); // API output

    } catch (err) {
        next(err);
    }
});

// POST /adverts -> Insert an advert
router.post('/', async (req, res, next) => {
    try {

        console.log('advert post file', req.file);
        console.log('advert post body', req.body);

        req.body.image = typeof req.file === 'undefined' ? '' : req.file.filename;
        
        const savedAdvert = await Advert.insert(req, next);

        res.json({
            status: 200,
            result: savedAdvert
        }); // API output

    } catch (err) {
        next(err);
    }
});


// -------------------- not required 
// PUT /adverts:id -> Update advert by id
router.put('/', async (req, res, next) => {
    try {

        // console.log('advert put file', req.file);
        // console.log('advert put body', req.body);

        // if (req.file === undefined)
        //     console.log('advert post file _undefined', req.file);

        // const id = req.params.id;
        // const data = req.body;

        if (req.file !== undefined){

            data.image = req.file.filename
            delete data.filename;
        }

        const savedAdvert = await Advert.updateAdvert(req, next);
        // const savedAdvert = await Advert.updateAdvert(id, data, next);

        res.json({
            status: 200,
            result: savedAdvert
        }); // API output

    } catch (err) {

        console.log('savedAdvert err', err)
        next(err);
    }
});

module.exports = router;