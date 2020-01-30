var createError  = require('http-errors');
var express      = require('express');
var path         = require('path');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');

/**
 * upload ad images with multer
 * https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
 */

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// define multer filter
const fileFilter = (req, file, cb) => {

  const mimeTypes = process.env.IMG_MIME_TYPES.split(',');

  //console.log('mimeTypes', mimeTypes, file.mimetype, file);

  if (
    mimeTypes.indexOf(file.mimetype) > -1
  ) {
    // Pending: read real file mimetype, this not work: change extension to an html a test 

    cb(null, true);

  } else {

    const err = new Error('Image format should be PNG,JPG or JPEG');
    err.status = 415;
    cb(err, false);
  }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter, 
    limits: { fileSize: process.env.MAX_IMAGE_SIZE }
  });
/// multer

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Setup de i18n
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);


/**
 * Var list to render
 */
app.locals.title = 'Wallaclone';
app.locals.app_root = `${process.env.APP_ROOT}:${process.env.PORT}/`;

/**
 * DB connection
 */

require('./lib/connectMongoose');
require('./models/Advert'); 

/**
 * Routes
 */

 // API authenticate via JWT
const loginController = require('./routes/loginController');
const jwtAuth = require('./lib/jwtAuth');

// v2.2 add upload.single('image') & jwtAuth()
app.use('/apiv1/ads', upload.single('image'),  jwtAuth(), require('./routes/apiv1/adverts'));
app.use('/apiv1/tags', jwtAuth(),  require('./routes/apiv1/tags'));
app.post('/apiv1/login', loginController.loginJWT);

// public app
app.use('/', require('./routes/index'));
app.use('/change-locale', require('./routes/change-locale'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  
  // Validation error
  if (err.array) {
    err.status = 422;
    const errInfo = err.array({
      onlyFirstError: true
    })[0];
    err.message = isAPI(req) ? {
        message: 'Not valid',
        errors: err.mapped()
      } :
      `Not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  if (isAPI(req)) {
    res.json({
      // status: 500,
      status: err.status,
      error: err.message
    });

    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}


module.exports = app;