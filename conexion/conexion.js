let mysql = require('mysql');
const OPCIONES_CNX = {
    host: 'localhost',
    user: 'adminpime',
    password: 'AdminMipe123',
    database: 'webmipe',
    multipleStatements: true, // acepta multimples consultas
};

let conexion = mysql.createConnection(OPCIONES_CNX);
conexion.connect((err, res) => {
    if (err) throw err;

    console.log('Base de datos mysql, online');
});

module.exports = conexion;