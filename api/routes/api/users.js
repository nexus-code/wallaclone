/**
 * Wallaclone API
 * Methods to handle user's API
 * - Authentication access
 */
'use strict';

const express = require('express');
const router  = express.Router();

const User = require('../../models/User');
const jwt = require('jsonwebtoken');

/**
 * User Routes
 */

// GET /Users -> List Users
router.get('/', async (req, res, next) => {
    try {        
        const users = await User.select(req);

        // only returns relevant user information ?

        res.json({
            status: 200,
            result: users
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

        // // create JWT
        // const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, {
        //     expiresIn: process.env.JWT_EXPIRES
        // });

        // // only returns necessary  user information
        // const returnedUser = {
        //     _id: savedUser._id,
        //     token: token,
        //     username: savedUser.username,
        //     email: savedUser.email,
        //     language: savedUser.language,
        // }

        const packData = savedUser.packData(savedUser);

        res.json({
            status: 200,
            // result: returnedUser
            result: packData
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

        const savedUser = await User.update(id, data, next);

        res.json({
            status: 200,
            result: savedUser
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