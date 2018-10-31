const { to, ReE, ReS } = require('../service/uitl.service');
let bcrypt = require('bcryptjs'); //passoword
let jwt = require('jsonwebtoken');
const SEED = require('../config').SEED;

let Sequelize = require('sequelize');
let config = require('../config');


let sequelize = new Sequelize(config.database, config.username, config.password, config.sequelizeOption);

const init = async function (req, res) {
        return ReS(res, { message: 'hello desde LA API GENERAL 2 INIT version 1' });
}
module.exports.init = init;


const logger = async function (req, res) {
        const usuario = req.body.usuario;
        const pass = req.body.password;

        console.log('passs ', req.body);

        let read_query = "SELECT * FROM `usuario` WHERE `usuario` = '" + usuario + "'";
        console.log(read_query);

        sequelize.query(read_query, { type: sequelize.QueryTypes.SELECT })
                .then(function (rows) {
                        
                        const result = bcrypt.compareSync(pass, rows[0].password);                        
                        if (!result) {
                                return ReE(res, 'Credenciales Incorrectas.');                                
                        } 

                        rows[0].password = ':)';
                        const token = jwt.sign({ usuario: rows[0] }, SEED, { expiresIn: 14400 });

                        return ReS(res, { usuario: rows[0], token: token });

                })
                .catch((err) => { return ReE(res, err); });
}

module.exports.logger = logger;
