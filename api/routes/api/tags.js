/**
 * Wallaclone API
 * list tags
 */
'use strict';

const express = require('express');
const router = express.Router();

const Advert = require('../../models/Advert');

router.get('/', async (req, res, next) => {
    try {
        
        const tags = await Advert.tagsList();
        res.json({status: 200, result: tags});  // only API output
    } catch (err) {
        next(err);
    }
});

module.exports = router;