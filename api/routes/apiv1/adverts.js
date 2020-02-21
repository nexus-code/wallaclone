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
const User = require('../../models/User');
const { query, param, body } = require('express-validator');

const { check, validationResult } = require('express-validator/check');

const blacklistHard = '/$€.+¡!*(),\\[\\]\'";/¿?:@=&<>#%{}|^~'; //characters excludes in params
const blacklistSoft = '/$*()\\[\\]\'"/@=&<>#{}|^~'; //characters excludes in params
const typesArray = ['sell', 'buy'];
const statusArray = ['sold', 'reserved', ''];
const tagsArray = ['motor', 'mobile', 'lifestyle', 'work'];

/**
 * advert Routes
 */

// GET /adverts -> List adverts
router.get('/', 
    [
        query('name').optional().isLength({ min: 20, max: 30 }).withMessage('debe estar entre 1 y 30 carácteres'),
        query('skip').optional().isInt({ gt: 0 }).withMessage('debe ser un numero entero mayor que 0'),
        query('limit').optional().isInt({ gt: 0 }).withMessage('debe ser un numero entero mayor que 0'),
        query('price').optional().custom(value => {
            let aux = value.split('-');
            let result = true;
            for (let i = 0; i < aux.length; i++) {
                if (aux[i] && isNaN(+aux[i])) {
                    result = false;
                }
            }
            return result;
        }).withMessage('debe ser numérico'),
    ]
    , async (req, res, next) => {
    try {

        const adverts = await Advert.select(req, next);

        res.json({
            status: 200,
            result: adverts
        }); // API output

    } catch (err) {
        next(err);
    }
});

// POST /adverts -> Insert an validated and sanitized advert
router.post('/', jwtAuth(), 
    check('name').isLength({ min: 5, max: 30 }).withMessage('Mandatory. String. Between 5 and 30 no special characters'),
    check('price').isInt({ gt: 0, lt: 10000000 }).withMessage('Mandatory. Int Between 1 and 10000000'),
    check('type').custom(value => {
        if (!typesArray.includes(value)) {
            throw new Error('Invalid type. Must be buy or sell');
        }
        return true;
    }),
    check('status').custom(value => {
        if (!statusArray.includes(value)) {
            throw new Error('Invalid status. Must be buy or sell');
        }
        return true;
    }),
    check('tag').custom(value => {
        if (!tagsArray.includes(value)) {
            throw new Error('Invalid tag. Must be: motor, mobile, lifestyle and/or  work ');
        }
        return true;
    }),
    check('description').isLength({ min: 5, max: 250 }).withMessage('Mandatory. String. Between 5 and 250 characters'),

    [
        body('name').trim().blacklist(blacklistHard),
        body('owner').isMongoId().withMessage('Mandatory. ID format'),
        body('description').trim().blacklist(blacklistSoft),
        body('imageFile').exists().isMimeType().withMessage('Mandatory. Valid formats: image/png,image/jpg,image/jpeg'),
    ]
    ,async (req, res, next) => {

        var err = validationResult(req);
        if (!err.isEmpty()) {
            res.json({
                status: 400,
                error: err
            });
            
        } else {
            // validation & sanitation passed
            try {
        
                const savedAdvert = await Advert.insert(req, next);
        
                res.json({
                    status: 200,
                    result: savedAdvert
                }); // API output
        
            } catch (err) {
                next(err);
            }
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