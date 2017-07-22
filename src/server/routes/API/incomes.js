var express = require('express');
var router = express.Router();
var path = require('path');
//var provider = require('./DBprovider')


router.get('/', function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' })

    provider.getAllIncomes( function ( result, err , fields) {
        if (err) throw err;
        res.json( result.data );
        //res.send(JSON.stringify({ a: result.data }));
        res.end();
    });
});

router.get('/month/:month?/:year?', function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' })

    //+1 because start with 0
    var currentMonth = new Date().getMonth() + 1;
    var currentYear  = new Date().getFullYear();

    var month = Number( req.params.month )   || currentMonth;
    var year =  Number( req.params.year  )   || currentYear;

    provider.getIncomesByMonthAndYear( month, year , function ( result, err , fields) {
        if (err) throw err;
        res.json( result.data );
        //res.send(JSON.stringify({ a: result.data }));
        res.end();

    });
});

router.get('/dates/:from?/:to?', function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' })

    res.end("TODO =]")
});


module.exports = router;
