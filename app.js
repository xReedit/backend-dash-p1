var express = require("express"); 
var bodyParser = require('body-parser');
var cors=require('cors');
var app = express();
var config = require('./config');

app.use(cors());
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

//CORS
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, *");
//     res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
//     next();
// });

// var appV1 = require('./routes/v1');

// var index = require('./models/index');

// para estadistica
var appV2 = require('./routes/v2');
app.use('/v2',appV2);

// para pwa-app-pedidos
var appV3 = require('./routes/v3');
app.use('/v3',appV3);



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handler
app.use(function(err, req, res, next) {
    // render the error page
    console.log(err);
    res.status(err.status || 500);
    res.json({
        status: 0,
        data: err.message
    });
    // res.render('error');
});

var server = app.listen(config.port, function () {
    console.log('Server is running.. port '+ config.port); 
});

module.exports = app;