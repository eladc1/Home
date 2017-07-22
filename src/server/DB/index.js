var config = require('./../../../bin/config.json');
var mongoose = require('mongoose');



mongoose.connect(config.mongoConnectionString);

var isMongoConnected = false;

var db = mongoose.connection;
db.on('error', function (err) {
    console.error(err);
});
db.once('open', function () {
    console.info('DB connected');
    isMongoConnected = true;
});

module.exports = db;