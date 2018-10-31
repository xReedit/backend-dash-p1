const { to, ReE, ReS } = require('../service/uitl.service');
let jwt = require('jsonwebtoken');
const SEED = require('../config').SEED;

exports.verificarToken = function (req, res, next) {
        var token = req.query.token;

        jwt.verify(token, SEED, (err, decode) => {
                if (err) {                        
                        return ReE(res, 'Token Incorrecto.');                                
                }

                req.usuariotoken = decode.usuario;
                next();                
        });
        // next();
}