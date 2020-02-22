/**
 * Wallaclone API
 * Adverts CRUD Methods
 * After validation & sanitation passed
 * 
 */
'use strict';

const express = require('express');
const Advert = require('../../models/Advert');


const createController = async (req, res, next) => {

    try {

        const savedAdvert = await Advert.insert(req, next);

        res.json({
            status: 200,
            result: savedAdvert
        }); // API output

    } catch (err) {
        next(err);
    }
};

const readController = async (req, res, next) => {


};

const updateController = async (req, res, next) => {

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
};

const deleteController = async (req, res, next) => {


};

module.exports = { 
    createController,
    readController,
    updateController,
    deleteController
 };