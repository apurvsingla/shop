const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'problem in connecting the database'));

db.once('open', function() {
    console.log('Successfully connected to the dataBase!');
})

module.exports = db;