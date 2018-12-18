const { to, ReE, ReS }  = require('../service/uitl.service');
let Sequelize = require('sequelize');
let config = require('../config');
let managerFilter = require('../utilitarios/filters');
let BuildSql = require('../service/buildsql.service');

let sequelize = new Sequelize(config.database, config.username, config.password, config.sequelizeOption);

let mysql_clean = function (string) {
        return sequelize.getQueryInterface().escape(string);
};

const init = async function (req, res) {
        return ReS(res, {
                message: 'hello desde NATIVE API GENERAL 2 INIT version 1'
        });
}
module.exports.init = init;



const getCuentasPagarByClientes = async function (req, res) {
        const idorg = managerFilter.getInfoToken(req,'idorg');
        const idsede = managerFilter.getInfoToken(req, 'idsede');
        // const idorg=1;
        // const idsede=1;
        let read_query = `
        SELECT v1.idcliente, c1.nombres, DATEDIFF(CURDATE(), SUBSTRING_INDEX(GROUP_CONCAT(vp.fecha_pago ORDER BY vp.idventa_detalle_pago SEPARATOR ','), ',', 1)) as dias_transcurridos, sum(vp.diferencia) as importe, count(vp.idventa_detalle_pago) as cantidad
        from transactor.venta_detalle_pago as vp
                inner join transactor.venta as v1 on v1.idventa = vp.idventa
                inner join transactor.cliente as c1 on c1.idcliente = v1.idcliente
        where(v1.idorg = ${idorg} and v1.idsede = ${idsede}) and vp.idtipo_pago = 3 and vp.estado = 0
        GROUP BY v1.idcliente
        ORDER BY dias_transcurridos desc
        `;        
        console.log(read_query);
         sequelize.query(read_query, {
                         type: sequelize.QueryTypes.SELECT
                 })
                 .then(function (rows) {
                         return ReS(res, {
                                 data: rows
                         });
                 })
                 .catch((err) => {
                         return ReE(res, err);
                 });

}
module.exports.getCuentasPagarByClientes = getCuentasPagarByClientes;