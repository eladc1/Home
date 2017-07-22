var express = require('express');
var router = express.Router();
var path = require('path');

const db = require('./../../DB');

var expenses = require('./expenses');
var incomes = require('./incomes');

var currentVersion = "1.0";

router.use(`/${currentVersion}/expenses`, expenses );
router.use(`/${currentVersion}/incomes`, incomes );

router.use('/', function(req, res, next) {
    res.writeHead( 200 , {"Context-Type" : "text/plain"});
    res.write('API is great!');
    res.end();
});

module.exports = router;
