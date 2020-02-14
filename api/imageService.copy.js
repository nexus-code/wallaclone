'use strict';
require('dotenv').config();

/**
 * Image handler service.
 * Move uploaded file to public imgFolder (process.env.IMG_FOLDER)
 * Resize them to requested size
 */

const cote = require('cote');
const responder = new cote.Responder({ name: 'image.responder' });

const path     = require('path');
const jimp     = require('jimp');
const moveFile = require('move-file');

const imgFolder = path.join(__dirname, process.env.IMG_FOLDER);
const widths = process.env.IMG_ADVERT_SIZES.split(',');

console.log('\r\nStarts image.service:');


responder.on('image.service', (req, done) => {
  console.log('image.service: ', req);
  
  const from = path.join(__dirname, 'uploads', req.file);
  const to   = path.join(imgFolder, req.file);
  const toThumb  = path.join(imgFolder, 'xs-' + req.file);
  const toMedium = path.join(imgFolder, 'md-' + req.file);
  
  console.log('\r\image.service widths:', widths);


  (async () => {
    await moveFile(from, to);
    console.log(`The image ${req.file} has been moved`);
   
    try {
      
      // NOTE.- Refactor to a single function:
      // create thumbnail image
      console.log('create thumbnail image: ', widths[0]);

      jimp.read(to)
        .then(img => {
          return img
            .resize(parseInt(widths[0]), jimp.AUTO)
            .writeAsync(toThumb);
        })
        .catch(err => {
          console.log(err);
        });

      // create medium image (to front) 
      console.log('create medium image: ', widths[1]);

      jimp.read(to)
        .then(img => {
          return img
            .resize(parseInt(widths[1]), jimp.AUTO)
            .writeAsync(toMedium);
        })
        .catch(err => {
          console.log(err);
        });

      console.log(`The image ${req.file} has been resized`, Date.now().toString());


     } catch (error) {
  
      console.log('Error on resize', error);     
    }
  })();
  
  done(console.log('done'));

});
