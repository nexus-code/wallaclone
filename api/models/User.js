/**
 * userSchema: User definition
 * 
 * Use mongoose
 * Export User (with CRUD methods)
 * https://mongoosejs.com/docs/validation.html
 * 
 */

'use strict';

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const nodemailerTransport = require('../lib/nodemailerConfigure');

const validEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: [3, 'Username is too short (min 3 characters)!'],
        maxlength: [25, 'Username is too long (max 25 characters)!']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: validEmail,
        trim: true,
        minlength: [7, 'email is too short (min 7 characters)!'],
        maxlength: [60, 'email is too long (max 60 characters)!']
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    forgotten_password: {
        code: {
            type: String,
            default: ''
        },
        time: {
            type: Date, 
            default: null
        }
    },
    language: {
        type: String,
        default: 'en'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
});

userSchema.index({ username: 1, email: 1, role: 1});

userSchema.pre("save", function (next) {
    // https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
    // encrypt user password

    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

/** 
 * User Methods
 */

userSchema.methods.comparePassword = function (plaintext, callback) {
    return callback(null, bcrypt.compareSync(plaintext, this.password));
};

userSchema.methods.packData = function() {
    // Returns necessary information only
    
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });

    return {
        _id: this._id,
        token: token,
        username: this.username,
        email: this.email,
        language: this.language,
    }
}

/**
 * @param to optional
 */
userSchema.statics.sendEmail = async function (from, to, subject, body) {
    
    return nodemailerTransport.sendMail({
        from,
        to,
        subject,
        html: body
    })
}

/**
 * 
 * CRUD functions
 * 
 */

userSchema.statics.insert = async function (req, next) {
    try {
        
        const user = new User(req.body);
        const newUser = await user.save();

        //Improve and format message
        const emailMessage = `<br><br><h1>Wellcome to Wallaclone!${newUser.name}</h1><br>`

        const wellcomeEmail = await User.sendEmail(process.env.APP_EMAIL, newUser.email, `${newUser.name}: Wellcome to Wallaclone!`, emailMessage);
        // Store!! : console.log(wellcomeEmail);

        return newUser

    } catch (err) {
        next(err);
    }
}

userSchema.statics.update = async function (data, next) {
    try {

        data.updated = moment();
        const updatedUser = await User.findOneAndUpdate({ _id: data.id }, data, { new: true });

        return updatedUser;

    } catch (err) {

        next(err);
    }
}


userSchema.statics.updateUserPasswd = async function (data, next) {
    try {

        data.updated = moment();
        data.password = bcrypt.hashSync(data.password, 10);
        data.forgotten_password = { code: '', time: null };   //reset

        const updatedUser = await User.findOneAndUpdate({ _id: data.id }, data, { new: true });

        return updatedUser;

    } catch (err) {

        next(err);
    }
}

userSchema.statics.delete = async function (_id, next) {
    try {

        await User.deleteOne({ _id }).exec;

        // DELETE user adverts FIRST (¿transaction?)!

        return 200;

    } catch (err) {
        next(err);
    }
}

// making the query:
// get url params via router
// return query users via quey
userSchema.statics.select = async function (req) {

    /** 
     * I move the search filtering to the model to gather all the logic of the class and avoid duplicate code.
     */

    // params in querystring. Must be objects for mongo. Schema filter 'typeof them'
    const id = req.query.id;
    const username = req.query.username;
    const role = req.query.role;
    const email = req.query.email;
    const created = req.query.created;

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    // const sort = req.query.sort || { 'created': -1 }; // sort created by default
    const sort = { 'created': 1 }; // sort created by default

    let filter = {};

    if (id) {
        filter._id = id;
    }

    if (username) {
        // 3. name   -> Starts with value
        filter.username = new RegExp('^' + username, "i");
    }

    if (role) {
        filter.role = role;
    }

    if (email) {
        filter.email = email;
    }

    const users = await list({ filter, skip, limit, fields, sort });
    // console.log('       - Query filter: ', filter);
    // console.log('       - Query result count: ', users.length);

    return users;
};


// return query predefinition
// userSchema.statics.list = function ({filter, skip, limit, fields, sort}) {
function list({ filter, skip, limit, fields, sort }) {
    // const query = user.find(filter);
    // console.log('       - Query: ', query);

    query.skip(skip).limit(limit).select(fields).sort(sort);
    return query.exec();
};

const User = mongoose.model('User', userSchema);

module.exports = User;