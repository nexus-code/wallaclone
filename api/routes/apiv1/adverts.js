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

// POST /adverts -> Insert an advert
router.post('/', jwtAuth(), [
    body('name').isLength({ min: 1, max: 30 }).withMessage('debe estar entre 1 y 30 carácteres'),
    body('description').optional().isLength({ min: 0, max: 100 }).withMessage('debe estar entre 0 y 100 carácteres'),
    body('price').isNumeric().withMessage('debe ser numérico'),
    body('photo').exists().withMessage('es obligatorio indicar una foto'),
    ],
    async (req, res, next) => {
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