'use strict';

/**
 * userSchema: User definition
 * 
 * Use mongoose
 * Export User (with CRUD methods)
 */

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: String,
    role: { type: String, default: 'user' },
    created: { type: Date, default: Date.now },
    updated: { type: Date }
});

userSchema.index({ username: 1, email: 1, role: 1});

userSchema.statics.hashPassword = function (plainPassword) {
    return bcrypt.hash(plainPassword, 10);
}


/** 
 * User Methods
 */

// insert a document
userSchema.statics.insert = async function (req, next) {
    try {
        
        // data
        const data = req.body;
        const user = new user(data);
        const newuser = await user.save();

        https://mongoosejs.com/docs/validation.html

        return newuser

    } catch (err) {
        next(err);
    }
}

// update a document
userSchema.statics.updateuser = async function (id, data, next) {
    try {

        const updateduser = await user.findOneAndUpdate({ _id: id }, data, { new: true });

        //  console.log('-- users.js update: ', updateduser);
        https://mongoosejs.com/docs/validation.html

        return updateduser;

    } catch (err) {
        next(err);
    }
}

// delete a user document
userSchema.statics.delete = async function (_id, next) {
    try {

        await user.deleteOne({ _id }).exec;

        // DELETE user adverts!

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
    // console.log('       - Query results count: ', users.length);

    return users;
};


// return query predefinition
// userSchema.statics.list = function ({filter, skip, limit, fields, sort}) {
function list({ filter, skip, limit, fields, sort }) {
    const query = user.find(filter);
    console.log('       - Query: ', query);

    query.skip(skip).limit(limit).select(fields).sort(sort);
    return query.exec();
};

function validUser(){


}


const User = mongoose.model('User', userSchema);

module.exports = User;
