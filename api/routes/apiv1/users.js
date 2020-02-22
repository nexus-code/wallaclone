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
        param('id').optional().isMongoId().withMessage('Mandatory. ID format'),
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
// Open for registers
router.post('/', async (req, res, next) => {
    try {

        const savedUser = await UserModel.insert(req, next);
        const packData = savedUser.packData();

        res.json({
            status: 200,
            result: packData
        });

    } catch (err) {
        next(err);
    }
});

// Update user. Must contain id
// Access restricted
router.put('/', jwtAuth(), async (req, res, next) => {
    try {

        const data = req.body;

        const savedUser = await UserModel.update(data, next);
        const packData = savedUser.packData();

        res.json({
            status: 200,
            result: packData
        });

    } catch (err) {
        next(err);
    }
});


module.exports = router;