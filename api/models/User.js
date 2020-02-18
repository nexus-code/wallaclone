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


// userSchema.statics.get = async function (id, next) {
//     try {


//         const user = await User.findById(id);

//         return user;

//     } catch (err) {

//         next(err);
//     }
// }

/**
 * @obj must be a { key: value}
 * Refactored! 20200218
 */
userSchema.statics.get = async function (obj) {
    try {

        // const user = await User.findById(id);
        const user = await User.findOne(obj);

        return user;

    } catch (err) {
        console.log('userSchema.statics.get', err);
    }
}


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

userSchema.statics.delete = async function (id, next) {
    try {


        const aux = await User.deleteOne({ _id: id }, function (err) {
            if (err) console.log(err);
            console.log("Successful deletion");
        });
        console.log('userSchema.statics.delete', aux);
        return 200;


    } catch (err) {
        next(err);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;