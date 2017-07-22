var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mime = require('mime');
 
 express.static.mime.define({
     'application/x-font-woff': ['woff'],
     'application/font-woff': ['woff']
 });


//var index = require('./src/routes/index');
var api = require('./src/server/routes/API');

var app = express();

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'dist', 'img/favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
//extended let us send object throw the url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
    /*app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));
*/

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api',             api);

app.use('/js',              express.static(__dirname + '/dist/js'));
app.use('/img',             express.static(__dirname + '/dist/img'));
app.use('/lib',             express.static(__dirname + '/dist/lib'));
app.use('/templates',       express.static(__dirname + '/dist/templates'));

app.use('/',                express.static(__dirname + '/dist/templates'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    console.log("errrrror 404 Page is coming for: "+ req.originalUrl);
    var err = new Error('Hy cool guy, the Page is Not Found');
    err.status = 404;
   // next(err);
    res.sendFile(path.resolve( __dirname + "/dist/404.html"));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    //res.render('error');
});

module.exports = app;


// var express = require('express'),
//     app = express();
//     f = require('./src/server/functions.js'),
//     path = require('path');
// //
// //
// // app.use(function(req, res, next) {
// //     res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
// //     res.header('Access-Control-Allow-Credentials', 'true');
// //     res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
// //     res.header('Access-Control-Expose-Headers', 'Content-Length');
// //     res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
// //     if (req.method === 'OPTIONS') {
// //         return res.send(200);
// //     } else {
// //         return next();
// //     }
// // });
// //
// //
// // var router = express.Router();
// // var mysql = require('mysql');
// //
// // var connection  = mysql.createConnection({
// //     host: 'localhost',
// //     database:'home',
// //     user:'home_elad',
// //     password: 'fLv7Vpjqu2uKmQXT'
// // });
//
//
// connection.connect();
// //
// //
// // router.get('/test', function(request,response) {
// //     connection.query('select * from expenses limit 2', function(err, rows, fields) {
// //         if (err) {
// //             console.log('Encountered an error:', err.message);
// //             return response.send(500, err.message);
// //         }
// //         var thedata = ({'services' : rows});
// //         console.log(thedata);
// //
// //         response.setHeader('Content-Type', 'application/json');
// //         response.send(JSON.stringify({ a: 1 }));
// //
// //         /*response.('index', {
// //             title: 'home',
// //             data: thedata,
// //             page: 'home'
// //         });*/
// //     });
// // });
// //
//
// //app.get('/test', f.simpleGet);
//
// //
// app.get('/', function (req, res) {
//     console.log('enter');
//     console.log(__dirname);
//     res.sendFile(path.resolve( __dirname + "/dist/index.html"));
// });
//
//
// var port = 3000;
//
// app.listen(port, function () {
//     console.log('Our app is running on http://localhost:' + port);
// });