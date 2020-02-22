/**
 * Wallaclone API
 * Users CRUD Methods
 * After validation & sanitation passed
 * 
 */
'use strict';

const express = require('express');
const UserModel = require('../../models/User');


const createController = async (req, res, next) => {

    try {

        console.log('createController', req.body);

        const savedUser = await UserModel.insert(req.body, next);

        if (savedUser) {

            const packData = savedUser.packData();

            res.json({
                status: 200,
                result: packData
            });
        } else {

            res.json({
                status: 400,
                error: 'User not created'
            });
        }

    } catch (err) {

        next(err);
    }
};

const readController = async (req, res, next) => {

    try {

        const id = req.params.id;
        const user = await UserModel.get({_id: id}, next);
        const packData = user.packData();

        res.json({
            status: 200,
            result: packData
        });

    } catch (err) {

        next(err);
    }
};

const updateController = async (req, res, next) => {

    try {

        const data = req.body;
        const savedUser = await UserModel.update(data, next);
        const packData = savedUser.packData();

        res.json({
            status: 200,
            result: packData
        });

    } catch (err) {

        console.log('updateController', err);

        next(err);
    }
};

const deleteController = async (req, res, next) => {


};

module.exports = { 
    createController,
    readController,
    updateController,
    deleteController
 };