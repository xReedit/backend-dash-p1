// var SequelizeAuto = require('sequelize-auto')
// let config = require('../config');

// var auto = new SequelizeAuto(config.database, config.username, config.password, config.sequelizeOption);

// auto.run(function (err) {
//         if (err) throw err;

//         console.log(auto.tables); // table list
//         console.log(auto.foreignKeys); // foreign key list
// });


'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
// var config = require(__dirname + '/../config/config.js')[env];
let config = require('../config');
var db = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config.sequelizeOption);

fs
        .readdirSync(__dirname)
        .filter(file => {
                return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
                var model = sequelize['import'](path.join(__dirname, file));
                db[model.name] = model;
        });

Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
                db[modelName].associate(db);
        }
});

db['prueba'].belongsTo(db['test'], { foreignKey: "idtest" });

db['sede'].belongsTo(db['org'], { foreignKey: "idorg" });

db['categoria'].belongsTo(db['org'], { foreignKey: "idorg" });
db['categoria'].belongsTo(db['sede'], { foreignKey: "idsede" });

db['almacen'].belongsTo(db['org'], { foreignKey: "idorg" });
db['almacen'].belongsTo(db['sede'], { foreignKey: "idsede" });

db['cliente'].belongsTo(db['org'], { foreignKey: "idorg" });
db['cliente'].belongsTo(db['sede'], { foreignKey: "idsede" });

db['marca'].belongsTo(db['org'], { foreignKey: "idorg" });
db['marca'].belongsTo(db['sede'], { foreignKey: "idsede" });

db['usuario'].belongsTo(db['org'], { foreignKey: "idorg" });
db['usuario'].belongsTo(db['sede'], { foreignKey: "idsede" });


db['producto'].belongsTo(db['org'], { foreignKey: "idorg" });
db['producto'].belongsTo(db['sede'], { foreignKey: "idsede" });
db['producto'].belongsTo(db['categoria'], { foreignKey: "idcategoria", as: 'categoria' });
db['producto'].belongsTo(db['marca'], { foreignKey: "idmarca" });
db['producto'].hasMany(db['producto_detalle'], { foreignKey: "idproducto" });


db['producto_detalle'].belongsTo(db['talla'], { foreignKey: "idtalla" });
db['producto_detalle'].belongsTo(db['producto'], { foreignKey: "idproducto" });

db['producto_stock'].belongsTo(db['producto_detalle'], { foreignKey: "idproducto_detalle" });
db['producto_stock'].belongsTo(db['almacen'], { foreignKey: "idalmacen" });

// db['distribuicion'].belongsTo(db['almacen'], { foreignKey: "idalmacen_a" });
// db['distribuicion'].belongsTo(db['almacen'], { foreignKey: "idalmacen_d" });
db['distribuicion'].belongsTo(db['usuario'], { foreignKey: "idusuario" });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;