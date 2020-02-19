'use strict';
require('dotenv').config();

/**
 * Image handler service.
 * Move uploaded file to public imgFolder 
 * Resize them to needy sizes
 */

const cote = require('cote');
const responder = new cote.Responder({ name: 'image.responder' });
const path = require('path');
const jimp = require('jimp');
const moveFile = require('move-file');
const moment = require('moment');

const imgFolder = path.join(__dirname, process.env.IMG_FOLDER);
const imgFormats = [
  { name: 'xs-', width: '410' },
  { name: 'md-', width: '680' },
  { name: 'lg-', width: '920' },
  { name: '', width: '1100' },
];


responder.on('image.service', (req, done) => {

  const from = path.join(__dirname, 'uploads', req.file);
  const destiny = path.join(imgFolder, req.file);
  let result = {};

  (async () => {

    try {
      await moveFile(from, destiny);
      console.log(`The image ${req.file} has been moved`);

      imgFormats.forEach( item => {

        const { name, width } = item;

        jimp.read(destiny)
          .then(img => {
            return img
              .resize(parseInt(width), jimp.AUTO)
              .writeAsync(path.join(imgFolder, `${name}${req.file}`));
          })
          .catch(error => result = { status: 500, msg: `${moment()} -> ${error}` });
      });

      result = { status: 200, msg: `The image ${req.file} has been resized OK ${moment()}` }

    } catch (error) {

      result = { status: 500, msg: `${moment()} -> ${error}` }
    }
  })();

  done(result);

});
