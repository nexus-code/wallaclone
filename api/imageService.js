'use strict';
require('dotenv').config();

/**
 * Image handler service.
 * Move uploaded file to public imgFolder (process.env.IMG_FOLDER)
 * Resize them to requested size
 */

const cote = require('cote');
const responder = new cote.Responder({ name: 'image.responder' });

const path = require('path');
const jimp = require('jimp');
const moveFile = require('move-file');

const imgFolder = path.join(__dirname, process.env.IMG_FOLDER);

responder.on('image.service', (req, done) => {
  console.log('image.service: ', req.file);

  const from = path.join(__dirname, 'uploads', req.file);
  const to = path.join(imgFolder, req.file);
  const toThumb = path.join(imgFolder, 'xs-' + req.file);
  const toMedium = path.join(imgFolder, 'md-' + req.file);

  const widths = req.widths.split(',');


  (async () => {
    await moveFile(from, to);
    console.log(`The image ${req.file} has been moved`);


    try {

      // NOTE.- Refactor to a single function:
      // create thumbnail image
      jimp.read(to)
        .then(img => {
          return img
            .resize(parseInt(widths[0]), jimp.AUTO)
            .writeAsync(toThumb);
        })
        .catch(err => {
          console.error(err);
        });

      // create medium image (to front) 
      jimp.read(to)
        .then(img => {
          return img
            .resize(parseInt(widths[1]), jimp.AUTO)
            .writeAsync(toMedium);
        })
        .catch(err => {
          console.error(err);
        });

      console.log(`The image ${req.file} has been resized`, Date.now().toString());


    } catch (error) {

      console.log('Error on resize', error);
    }
  })();

  done();

});
