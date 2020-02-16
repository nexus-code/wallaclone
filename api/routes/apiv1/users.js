/**
 * Wallaclone API
 * Methods to handle user's API
 * - Access authenticated
 */
'use strict';

const express = require('express');
const router  = express.Router();
const jwtAuth = require('../../lib/jwtAuth');
const UserModel = require('../../models/User');

/**
 * User Routes
 */

// Get user info. 
// Access restricted
router.get('/:id', jwtAuth(), async (req, res, next) => {
    try {

        const id = req.params.id;
        const user = await UserModel.get(id, next);
        const packData = user.packData();

        res.json({
            status: 200,
            result: packData
        });

    } catch (err) {
        next(err);
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