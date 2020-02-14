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
const widths = process.env.IMG_ADVERT_SIZES.split(',');

console.log('\r\nStarts image.service:');


responder.on('image.service', (req, done) => {
  console.log('image.service: ');
  console.log('----> file: ', req.file);

  const from = path.join(__dirname, 'uploads', req.file);
  const to = path.join(imgFolder, req.file);
  const toThumb = path.join(imgFolder, 'xs-' + req.file);
  const toMedium = path.join(imgFolder, 'md-' + req.file);


  (async () => {
    await moveFile(from, to);
    console.log(`The image ${req.file} has been moved`);

    try {

      // NOTE.- Refactor to a single function:
      // create thumbnail image
      const _return = {};

      jimp.read(to)
        .then(img => {
          console.log('create thumbnail image: ', widths[0]);
          return img
            .resize(parseInt(widths[0]), jimp.AUTO)
            .writeAsync(toThumb);
        })
        .catch(error => console.log(error));

      // create medium image (to front) 
      console.log('create medium image: ', widths[1]);

      // jimp.read(to)
      //   .then(img => {
      //     img
      //       .resize(parseInt(widths[1]), jimp.AUTO)
      //       .writeAsync(toMedium);
      //   })
      //   .catch(error => console.log(error));

      console.log(`The image ${req.file} has been resized`, Date.now().toString());


    } catch (error) {

      console.log('Error on resize', error);
    }
  })();

  done();

});
