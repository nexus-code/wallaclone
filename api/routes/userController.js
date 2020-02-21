'use strict';

/**
 * 
 * Validation data for user routes
 * 
 */


const { check, validationResult } = require('express-validator');


exports.validate = method => {


   [
        // username must be an email
        check('username').exists(),
        // password must be at least 5 chars long
        check('password').exists()
    ], (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    }

}