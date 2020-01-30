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
        const adverts = await Advert.select(req, res, next);

        res.json({
            status: 200,
            results: adverts
        }); // API output

    } catch (err) {
        next(err);
    }
});

// POST /adverts -> Insert an advert
router.post('/', async (req, res, next) => {
    try {

        req.body.image = typeof req.file === 'undefined' ? '' : req.file.filename;
        
        const savedAdvert = await Advert.insert(req, res, next);

        res.json({
            status: 200,
            results: savedAdvert
        }); // API output

    } catch (err) {
        next(err);
    }
});


// -------------------- not required 
// PUT /adverts:id -> Update advert by id
router.put('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;
        const data = req.body;

        const savedAdvert = await Advert.updateAdvert(id, data, next);

        res.json({
            status: 200,
            results: savedAdvert
        }); // API output

    } catch (err) {
        next(err);
    }
});

// DELETE /adverts:id -> Delete advert by id
router.delete('/:id', async (req, res, next) => {
    try {

        const _id = req.params.id; 
        const _status = await Advert.delete(_id, next);

        res.json({
            status: _status
        });

    } catch (err) {
        next(err);
    }
});
/// ^----------------------

module.exports = router;