var express = require('express');
var router = express.Router();
var path = require('path');
var provider = require('./../../DB/providers/incomesProvider');


router.get('/', function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    provider.getAllIncomes( function ( err, result ) {
        if (err) console.error(err);
        res.json( result );
        res.end();
    });
});

router.post('/', function(req, res){
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    //TODO auth
    provider.postNewIncome(  req.body , function ( err, result ) {
        if (err) console.error(err);
        res.json( result );
        res.end();
    });
});

router.put('/', function(req, res){
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    //TODO auth
    provider.updateIncome(  req.body , function ( err, result ) {
        if (err) console.error(err);
        res.json( result );
        res.end();
    });
});

router.delete('/', function(req, res){
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    //TODO auth
    provider.deleteIncome(  req.id , function ( err, result ) {
        if (err) console.error(err);
        res.json( result );
        res.end();
    });
});


router.get('/month/:month?/:year?', function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    //+1 because start with 0 // the mounth use to be +1, bun in mongo its doest work. IDK Y.
    var currentMonth = new Date().getMonth() +1;
    var currentYear  = new Date().getFullYear();

    var month = Number( req.params.month )   || currentMonth;
    var year =  Number( req.params.year  )   || currentYear;

    provider.getIncomesByMonthAndYear( month, year , function ( err, result) {
        if (err) throw err;
        res.json( result );
        //res.send(JSON.stringify({ a: result.data }));
        res.end();

    });
});

router.get('/dates/:from?/:to?', function(req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });

    res.end("TODO =]");
});


module.exports = router;