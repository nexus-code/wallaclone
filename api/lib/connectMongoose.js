'use strict';

/**
 * Connect to MongoDB via Mongoose
 */

// load & config mongoose
const mongoose = require('mongoose');
const conn = mongoose.connection;
require('dotenv').config();

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

// handler conn error
conn.on('error', err => {
    console.log('Error connection', err);
    process.exit(1001); 
});

conn.once('open', () => {
    console.log('\r\n\r\nWallaclone app conect to MongoDB: DB->', conn.name); //mongoose.connection.name;
})

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true  });
module.exports = conn;