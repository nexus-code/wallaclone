var express = require('express');
var router = express.Router();
// var adFilter = require('./filters');

const Advert = require('../models/Advert');


/* GET home page. */
router.get('/', async (req, res, next) => {
  
    try {
        
        const adverts = await Advert.select(req, res, next);

        res.render('index', {advertlist: adverts}); // load output into view

    } catch (err) {
        next(err);
    }
});

module.exports = router;
