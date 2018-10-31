let mysql = require('mysql');
const OPCIONES_CNX = {
    host: 'localhost',
    user: 'adminTransactor',
    password: '159159159',
    database: 'transactor',
    multipleStatements: true, // acepta multimples consultas
};

let conexion = mysql.createConnection(OPCIONES_CNX);
conexion.connect((err, res) => {
    if (err) throw err;

    console.log('Base de datos mysql, online');
});

module.exports = conexion;