var config = {};

config.port = 3000;

//Authentication
config.auth = false;

//Database
config.database = 'transactor';
config.username = 'adminTransactor';
config.password = '159159159';

config.host="localhost";
config.dialect="mysql";
config.operatorsAliases = false;

config.sequelizeOption = { host:"localhost", dialect:"mysql", operatorsAliases:false }

config.table_prefix = '';
//Pagination
config.paginate = true;
config.page_limit = 10;

module.exports = config;