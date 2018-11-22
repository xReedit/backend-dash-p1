let managerFilter = require('../utilitarios/filters')
let Sequelize = require('sequelize');
let config = require('../config');

let sequelize = new Sequelize(config.database, config.username, config.password, config.sequelizeOption);
let mysql_clean = function (string) {
        return sequelize.getQueryInterface().escape(string);
};

let buildSql = {
        Insert: (req) => { // cocina los datos recibidos y los convierte a cadena sql                                
                let keys = '';
                let values = '';         
                let valuesInsert = '';       

                let data = [];
                
                if (req.body.length) {
                        data = req.body;
                } else { 
                        data.push(req.body);
                }

                console.log(data.length);
                data.map( row => {
                        keys = '';
                        values='';
                        Object.keys(row).forEach(function (key, index) {
                                // X_ = indica no guardar
                                if (key.indexOf('X_') >= 0 ) { return; }
                                
                                let val = row[key];
        
                                // info token // esto coloca automaticamente por ejemplo el idorg y el idsede (si viene en el body > {idorg: '', idsede:''})
                                val = managerFilter.getInfoToken(req, key) || val;                                
        
                                keys += "`" + key + "`";
                                values += mysql_clean(val);
                                if (Object.keys(row).length != (index + 1)) {
                                        keys += ',';
                                        values += ',';                                        
                                }
                        });

                        valuesInsert += '(' + values + '),';
                } )

                valuesInsert = valuesInsert.slice(0, -1);

                console.log('values: ', valuesInsert);

                return "` (" + keys + ") VALUES " + valuesInsert;
        }
}

module.exports = buildSql;
