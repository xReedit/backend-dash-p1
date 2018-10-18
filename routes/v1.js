let express = require("express"); 
var appa = express();
// var router = require('express').Router();

let inicioControler = require('../controllers/inicio');
// appa.use('/inicio', inicioControler);

let APIRoutes = () => {
    appa.use('/inicio', inicioControler);
    return appa;
}

// let APIRoutes = () => {
//     router.get('/inicio', inicioControler)

//     return router;
// }

// app.get('/', function (req, res) {
//     return res.send({ error: true, message: 'hello desde version 1' })
// });


module.exports = APIRoutes;