/**
 * Wallaclone API
 * Methods to handle user's API
 * - Access authenticated
 */
'use strict';

const express = require('express');
const router  = express.Router();
const jwtAuth = require('../../lib/jwtAuth');

const { createController, readController, updateController } = require('./usersCrudController');
const { query, param, body, check, validationResult } = require('express-validator');
/**
 * User Routes
 */

// Get user info. 
// Access restricted
router.get('/:id', 
    jwtAuth(),
    [
        param('id').isMongoId().withMessage('Mandatory. ID format'),
    ],
    (req, res, next) => {

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

// POST /Users -> Insert an User. 
// Open for new registers
router.post('/',
    check('username').optional().isLength({ min: 5, max: 25 }).withMessage('String. Between 5 and 25 no special characters'),
    check('password').optional().isLength({ min: 7, max: 25 }).withMessage('String. Between 5 and 25 no special characters'),
    check('language').optional().isLength({ min: 2, max: 6 }).withMessage('String. Between 2 and 6 no special characters'),
    check('email').optional().isEmail(),
    [
        body('username').trim().blacklist(process.env.BLACKLIST_HARD),
        body('password').trim(),
        body('email').normalizeEmail().trim(),
        body('language').trim().blacklist(process.env.BLACKLIST_HARD),
    ]
    ,
    (req, res, next) => {
        
        
        console.log('post create user', req.body);
        
        
        var err = validationResult(req.body);
        if (!err.isEmpty()) {
            
            res.json({
                status: 400,
                error: err
            });
            
        } else {
            // validation & sanitation passed
            createController(req, res, next);
        }
    }
);

// Update user. Must contain id
// Access restricted in app.js
router.put('/', 
    jwtAuth(),
    check('id').isMongoId().isLength({ min: 24, max: 25 }).withMessage('Mandatory. ID format'),
    check('username').optional().isLength({ min: 5, max: 25 }).withMessage('String. Between 5 and 25 no special characters'),
    check('password').optional().isLength({ min: 7, max: 25 }).withMessage('String. Between 5 and 25 no special characters'),
    check('language').optional().isLength({ min: 2, max: 6 }).withMessage('String. Between 2 and 6 no special characters'),
    check('email').optional().isEmail(),
    [
        body('id').isMongoId().withMessage('Mandatory. ID format'),
        body('username').trim().blacklist(process.env.BLACKLIST_HARD),
        body('password').trim(),
        body('email').normalizeEmail().trim(),
        body('language').trim().blacklist(process.env.BLACKLIST_HARD),
    ],
    (req, res, next) => {

        console.log('   req.body   put: ', req.body);

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