'use strict';
require('dotenv').config();

/**
 * Image handler service.
 * Move uploaded file to public imgFolder (process.env.IMG_FOLDER)
 * Resize them to requested size
 */

const cote = require('cote');
const responder = new cote.Responder({ name: 'wallc.image.responder' });

const path = require('path');
const jimp = require('jimp');
const moveFile = require('move-file');

const imgFolder = path.join(__dirname, process.env.IMG_FOLDER);
const widths = process.env.IMG_ADVERT_SIZES.split(',');

console.log('Starts wallc.image.service:');


responder.on('wallc.image.service', (req, done) => {
  console.log('wallc.image.service: ');

  done('wallc.image.service:  ' + req.file);

});
