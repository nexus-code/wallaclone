/**
 * Initializes images demo. Copies & resize to public/images folder (after empty it)
 * Makes copy, not move like imageService, to perserve initial images for new testings
 */

'use strict';

require('dotenv').config();

const fs   = require('fs');
const path = require('path');
const jimp = require('jimp');

const imgFolder = path.join(__dirname, process.env.IMG_FOLDER);
const sizes     = process.env.IMG_AD_SIZES.split(',')
const pictures = [
        'lifestyle1.jpg',
        'lifestyle2.jpg',
        'lifestyle3.jpg',
        'motor1.jpg',
        'motor2.jpg',
        'motor3.jpg',
        'mobile1.jpg',
        'mobile2.jpg',
        'mobile3.jpg',
        'work1.jpg',
        'work2.jpg',
        'work3.jpg'
    ];

function emptyImagesFolder(){
    // remove all files from folder

    fs.readdir(imgFolder, (err, files) => {
        if (err) throw err;

        files.forEach(file => 
            
            fs.unlink(path.join(imgFolder, file), err => {
                if (err) console.error(err);
            })
        );
    });
}

(function InitializeImages() {

    emptyImagesFolder();

    //  Copies & resize
     
    pictures.forEach(picture => {

        const from = path.join(__dirname, 'uploads', picture);

        // copy original image
        fs.copyFile(from, path.join(imgFolder, picture), (err) => {

            if (err) console.error(err);
        });

        // copy & resize
        sizes.forEach((size, index) => {

            const pre = !index ? 'xs-' : 'md-';  // sizes.length = 2 => index 0 || 1
            const to = path.join(imgFolder, pre + picture);

            jimp.read(from)
                .then(img => {
                    return img
                        .resize(parseInt(size), jimp.AUTO)
                        .writeAsync(to);
                })
                .catch(err => {
                    console.error(err);
                });
        });
    })
})();