'use strict';

/**
 * userSchema: User definition
 * Use mongoose
 * Export User 
 */

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const userSchema = mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    created: { type: Date, default: Date.now },
    updated: { type: Date }
});

userSchema.statics.hashPassword = function (plainPassword) {
    return bcrypt.hash(plainPassword, 10);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
