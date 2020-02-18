'use strict';
require('dotenv').config();

/**
 * Image handler service.
 * Move uploaded file to public imgFolder (process.env.IMG_FOLDER)
 * Resize them to requested size
 */

const cote = require('cote');
const wallcImageService = new cote.Responder({ name: 'wallc.image.responder' });

const path = require('path');
const jimp = require('jimp');
const moveFile = require('move-file');

const imgFolder = path.join(__dirname, process.env.IMG_FOLDER);

wallcImageService.on('wallcImages', (req, done) => {
  console.log('wallcImages: ', req.image);

  const from = path.join(__dirname, 'uploads', req.image);
  const to = path.join(imgFolder, req.image);
  const toThumb = path.join(imgFolder, 'xs-' + req.image);
  const toMedium = path.join(imgFolder, 'md-' + req.image);
  const widths = req.widths.split(',');

  let _return = {status: 'OK'}; 

  (async () => {

    try {
      await moveFile(from, to);

      let _errs = '';

      // NOTE.- Refactor to a single function:
      // create xs image
      jimp.read(to)
        .then(img => {
          return img
            .resize(parseInt(widths[0]), jimp.AUTO)
            .writeAsync(toThumb);
        })
        .catch(err => {
          _errs = `Error XS resize: ${err}`
        });

      // create md image 
      jimp.read(to)
        .then(img => {
          return img
            .resize(parseInt(widths[1]), jimp.AUTO)
            .writeAsync(toMedium);
        })
        .catch(err => {
          console.error(err);
          _errs = `${_errs}. Error MD resize: ${err}`

        });

      _return = {status: 'ok'};

    } catch (error) {

      _return = { status: 'error', msg:`${_errs}. Error MD resize: ${err}` };
    }
  })();

  done(_return);
});