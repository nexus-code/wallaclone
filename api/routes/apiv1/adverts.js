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

const { createController, readController, updateController } = require('./advertsCrudController');
const { query, param, body, check, validationResult } = require('express-validator');

const typesArray = ['sell', 'buy'];
const statusArray = ['sold', 'reserved', ''];
const tagsArray = ['motor', 'mobile', 'lifestyle', 'work'];

/**
 * advert Routes
 */

// GET /adverts -> List adverts
router.get('/', 
    [
        query('id').optional().isMongoId().withMessage('Mandatory. ID format'),
        query('name').optional().isLength({ min: 5, max: 40 }).blacklist(process.env.BLACKLIST_HARD).withMessage('String. Between 5 and 30 no special characters'),
        query('username').optional().isLength({ min: 5, max: 30 }).blacklist(process.env.BLACKLIST_HARD).withMessage('String. Between 5 and 30 no special characters'),
        query('tags').optional().blacklist(process.env.BLACKLIST_HARD),
        query('skip').optional().isInt({ gt: 1 }).withMessage('Int > 1'),
        query('limit').optional().isInt({ gt: 1 }).withMessage('Int > 1'),
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
    , (req, res, next) => {

        var err = validationResult(req);
        if (!err.isEmpty()) {

            res.json({
                status: 400,
                error: err
            });
        
        } else {

            // validation & sanitation passed
            readController(req, res, next);
        }

});

// adverts by id
router.get('/:id',
    [
        param('id').optional().isMongoId().withMessage('Mandatory. ID format'),
    ]
    , (req, res, next) => {

        var err = validationResult(req);
        if (!err.isEmpty()) {

            res.json({
                status: 400,
                error: err
            });

        } else {

            readController(req, res, next);
        }

    });

// POST /adverts -> Insert an validated and sanitized advert

let postType = ''; //Status only applicable to sell type

router.post('/', jwtAuth(), 
    check('name').isLength({ min: 5, max: 40 }).withMessage('Mandatory. String. Between 5 and 40 no special characters'),
    check('price').isInt({ gt: 0, lt: 10000000 }).withMessage('Mandatory. Int Between 1 and 10000000'),
    check('type').custom(value => {
        if (!typesArray.includes(value)) {
            throw new Error('Invalid type. Must be buy or sell');
        }
        postType = value;
        return true;
    }),
    check('status').custom(value => {

        if (postType !== 'sell') {
            throw new Error('Status only applicable to sell type');
        }
        if (!statusArray.includes(value)) {
            throw new Error('Invalid status. Must be empty, sold or reserved');
        }
        return true;
    }),
    check('tags').custom(value => {

        try {

            value.split(',').forEach(element => {
                
                if (!tagsArray.includes(element.trim())) {
                    throw new Error('Invalid tags. Must be: motor, mobile, lifestyle and/or work');
                }
            });
            
            return true;

        } catch (error) {
            throw new Error(`Invalid tags format (). Error: ${error}`);

        }
    }),
    check('description').isLength({ min: 5, max: 250 }).withMessage('Mandatory. String. Between 5 and 250 characters'),
    [
        body('name').trim().blacklist(process.env.BLACKLIST_HARD),
        body('owner').isMongoId().withMessage('Mandatory. ID format'),
    ]
    , (req, res, next) => {

        var err = validationResult(req);
        if (!err.isEmpty()) {
            
            res.json({
                status: 400,
                error: err
            });
            
        } else {

            // validation & sanitation passed
            createController(req, res, next);
        }
});


// PUT /adverts Update advert by req.body.id
router.put('/', jwtAuth(),
    check('name').isLength({ min: 5, max: 40 }).withMessage('Mandatory. String. Between 5 and 40 no special characters'),
    check('price').isInt({ gt: 0, lt: 10000000 }).withMessage('Mandatory. Int Between 1 and 10000000'),
    check('type').custom(value => {
        if (!typesArray.includes(value)) {
            throw new Error('Invalid type. Must be buy or sell');
        }
        postType = value;
        return true;
    }),
    check('status').custom(value => {

        if (postType !== 'sell') {
            throw new Error('Status only applicable to sell type');
        }
        if (!statusArray.includes(value)) {
            throw new Error('Invalid status. Must be empty, sold or reserved');
        }
        return true;
    }),
    check('tags').custom(value => {

        try {

            value.split(',').forEach(element => {

                if (!tagsArray.includes(element.trim())) {
                    throw new Error('Invalid tags. Must be: motor, mobile, lifestyle and/or work');
                }
            });

            return true;

        } catch (error) {
            throw new Error(`Invalid tags format (). Error: ${error}`);

        }
    }),
    check('description').isLength({ min: 5, max: 240 }).withMessage('Mandatory. String. Between 5 and 240 characters'),
    [
        body('_id').isMongoId().withMessage('Mandatory. ID format'),
        body('name').trim().blacklist(process.env.BLACKLIST_HARD),
        body('owner').isMongoId().withMessage('Mandatory. ID format'),
    ]
    , async (req, res, next) => {

        var err = validationResult(req);
        if (!err.isEmpty()) {
            
            res.json({
                status: 400,
                error: err
            });

        } else {    
    
            // validation & sanitation passed
            updateController(req, res, next);            
        }
});

module.exports = router;