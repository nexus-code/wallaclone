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
const jwtAuth = require('../../lib/jwtAuth');
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
router.post('/', jwtAuth(), async (req, res, next) => {
    try {

        // req.body.image = typeof req.file === 'undefined' ? '' : req.file.filename;
        
        const savedAdvert = await Advert.insert(req, next);

        res.json({
            status: 200,
            result: savedAdvert
        }); // API output

    } catch (err) {
        next(err);
    }
});


// PUT /adverts Update advert by req.body.id
router.put('/', jwtAuth(), async (req, res, next) => {
    try {


        const savedAdvert = await Advert.update(req, next);

        res.json({
            status: 200,
            result: savedAdvert
        });

    } catch (err) {

        console.log('savedAdvert err', err)
        next(err);
    }
});

module.exports = router;