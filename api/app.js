const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const helmet     = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss        = require('xss-clean');
const bodyParser   = require('body-parser');
const slugify = require('slugify');
const multer = require('multer');

const parseImageName = imageName => slugify(imageName.trim(), { replacement: '-', lower: true, remove: /[*+~()_&%{}'"!:@]/g});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '__' + parseImageName(file.originalname))
  }
})

// define multer filter
const fileFilter = (req, file, cb) => {

  const mimeTypes = process.env.IMG_MIME_TYPES.split(',');

  if ( mimeTypes.indexOf(file.mimetype) > -1 ) {
    // to be done: read real file mimetype, this not work: change extension to an html a test 

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

/**
 * Security improves: 
 * https://itnext.io/make-security-on-your-nodejs-api-the-priority-50da8dc71d68
 * 
 */
// Helmet: https://github.com/helmetjs/helmet
app.use(helmet());

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

// Data Sanitization against XSS attacks
app.use(xss());
///

// view engine setup CLOSE
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
///

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Body parser config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Setup i18n READY
 */
const i18n = require('./lib/i18nConfigure')();
app.use(i18n.init);


/**
 * Var list to render 
 */
// app.locals.title = 'Wallaclone';
// app.locals.app_root = `${process.env.APP_ROOT}:${process.env.PORT}/`;


/**
 * Routes
 */

// Middleware: Configures headers & CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Request-Headers');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, PUT, DELETE');
  next();
});


/**
 * DB connection
 */

require('./lib/connectMongoose');

/**
 * Validation
 */


// API authenticate with JWT
const jwtAuth = require('./lib/jwtAuth');

const loginController = require('./routes/loginController');
const recoverPasswdController = require('./routes/recoverPasswdController');
const unsubscribeController = require('./routes/unsubscribeController');
const removeAdvertController = require('./routes/removeAdvertController');

const { body } = require('express-validator');

/**
 * Users routes
 */

app.use('/apiv1/users', require('./routes/apiv1/users'));

app.use('/apiv1/login', [
  body('username').trim().isLength({ min: 5, max: 25 }).blacklist(process.env.BLACKLIST_HARD),
  body('password').trim().isLength({ min: 7, max: 25 }),
], loginController.login);


app.use('/apiv1/recoverpasswd', recoverPasswdController.recover);
app.use('/apiv1/resetpasswd', recoverPasswdController.reset);
app.use('/apiv1/unsubscribe', jwtAuth(), unsubscribeController.do);

/**
 * Adverts routers
 */
app.use('/apiv1/adverts', upload.single('imageFile'), require('./routes/apiv1/adverts'));
// app.use('/apiv1/removeadvert', jwtAuth(), removeAdvertController.do);
app.use('/apiv1/removeadvert', removeAdvertController.do);
app.use('/apiv1/tags', jwtAuth(), require('./routes/apiv1/tags'));


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
    
    // console.log('\r\n\r\nAPI ERRs file:\r\n', req.file);
    // console.log('\r\n\r\nAPI ERRs body:\r\n', req.body);
    // console.log('\r\n\r\nAPI ERRs status:\r\n', err.status);
    // console.log('\r\n\r\nAPI ERRs message:\r\n', err.message);
    
    res.json({
      status: err.status || 500,
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


const isAPI = req => req.originalUrl.indexOf('/apiv1') === 0;

module.exports = app;