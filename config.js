var config = {};

config.port = 3000;

//Authentication
config.auth = false;

//Database
config.database = 'restobar';
config.username = 'resto';
config.password = '182182';

config.host="192.168.1.64";
config.dialect="mysql";
config.operatorsAliases = false;

config.sequelizeOption = { 
        host:"192.168.1.64", 
        dialect:"mysql", 
        operatorsAliases: false, timezone: "+03:00",
                define: {
                        underscored: true,
                        timestamps: false
                },
                logging: false
        }

config.table_prefix = '';
//Pagination
config.paginate = true;
config.page_limit = 10;

config.SEED = 'Reedit@laClave';

module.exports = config;