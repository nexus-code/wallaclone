/**
 * Wallaclone API
 * Methods to handle user's API
 * - Authentication access
 */
'use strict';

const express = require('express');
const router  = express.Router();

const User = require('../../models/User');

/**
 * User Routes
 */

// GET /Users -> List Users
router.get('/', async (req, res, next) => {
    try {        
        const Users = await User.select(req);

        res.json({
            status: 200,
            results: Users
        }); // API output

    } catch (err) {
        next(err);
    }
});

// POST /Users -> Insert an User
router.post('/', async (req, res, next) => {
    try {

        // improve?
        // req.body.image = typeof req.file === 'undefined' ? '' : req.file.filename;
        
        const savedUser = await User.insert(req, next);

        res.json({
            status: 200,
            results: savedUser
        }); // API output

    } catch (err) {
        next(err);
    }
});


// PUT /Users:id -> Update User by id
router.put('/:id', async (req, res, next) => {
    try {

        const id = req.params.id;
        const data = req.body;

        const savedUser = await User.updateUser(id, data, next);

        res.json({
            status: 200,
            results: savedUser
        }); // API output

    } catch (err) {
        next(err);
    }
});

// DELETE /Users:id -> Delete User by id
router.delete('/:id', async (req, res, next) => {
    try {

        const _id = req.params.id; 
        const _status = await User.delete(_id, next);

        res.json({
            status: _status
        });

    } catch (err) {
        next(err);
    }
});
/// ^----------------------

module.exports = router;