/**
 * Wallaclone API
 * Methods to handle user's API
 * - Authentication access
 */
'use strict';

const express = require('express');
const router  = express.Router();

const UserModel = require('../../models/User');
const jwt = require('jsonwebtoken');

/**
 * User Routes
 */

// GET /Users -> List Users
router.get('/', async (req, res, next) => {
    try {        
        const users = await UserModel.select(req);

        // map packData useres?

        res.json({
            status: 200,
            result: users
        });

    } catch (err) {
        next(err);
    }
});

// POST /Users -> Insert an User
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


router.put('/:id', async (req, res, next) => {
    try {

        // const id = req.params.id;
        const data = req.body;
        data.id = req.params.id;

        const savedUser = await UserModel.update(data, next);

        res.json({
            status: 200,
            result: savedUser
        });

    } catch (err) {
        next(err);
    }
});

// DELETE /Users:id -> Delete User by id
router.delete('/:id', async (req, res, next) => {
    try {

        const _id = req.params.id; 

        console.log('delete user:', _id)
        res.json({
            status: false
        });
        
        const _status = await UserModel.removeById(_id, next);

        res.json({
            status: _status
        });

    } catch (err) {
        next(err);
    }
});
/// ^----------------------

module.exports = router;