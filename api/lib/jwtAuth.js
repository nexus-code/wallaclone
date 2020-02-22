'use strict';

/**
 * Authentication & Authorization
 */

const jwt = require('jsonwebtoken');

module.exports = function() {
  
  return function(req, res, next) {
    // read get Token

    // const token = req.body.token || req.query.token || req.get('Authorization').split(' ')[1];
    let token = req.body.token || req.query.token;

    if ( !token && req.get('Authorization') ) 
      token = req.get('Authorization').split(' ')[1]



    // exit without token
    if (!token) {
      const err = new Error('No token provided');
      err.status = 401;
      next(err);
      return;
    }

    // exit with invalid token
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        err.status = 401;
        next(err);
        return;
      }

      // API only need user ID ( otherwhise add payload )
      req.apiUserId = payload._id;
      next();
    });

  }
}