const { to, ReE, ReS }  = require('../service/uitl.service');
let Sequelize = require('sequelize');
let config = require('../config');
let managerFilter = require('../utilitarios/filters');
let BuildSql = require('../service/buildsql.service');
let utilitarios = require('../utilitarios/fecha.js');

let sequelize = new Sequelize(config.database, config.username, config.password, config.sequelizeOption);

let mysql_clean = function (string) {
        return sequelize.getQueryInterface().escape(string);
};

const init = async function (req, res) {
        return ReS(res, {
                message: 'hello desde NATIVE API ESTADISTICA INIT version 1'
        });
}
module.exports.init = init;

// const idorg = 1;
// const idsede = 1;

const getFechaNow = async function (req, res) {
	return ReS(res, {
				data: {f_actual: utilitarios.getFechaActualFormatLocal(), h_actual: utilitarios.getHoraActual()}
			});

}
module.exports.getFechaNow = getFechaNow;

const getMetaSede = async function (req, res) {
        const idorg = managerFilter.getInfoToken(req,'idorg');
        const idsede = managerFilter.getInfoToken(req, 'idsede');
        
        let read_query = `SELECT * from sede_meta where(idorg = ${idorg} and idsede = ${idsede}) and estado = 0`;        
        console.log(read_query);
         sequelize.query(read_query, {type: sequelize.QueryTypes.SELECT})
                .then(function (rows) {
                        return ReS(res, {
                                data: rows
                        });
                })
                .catch((err) => {
                        return ReE(res, err);
                });

}
module.exports.getMetaSede = getMetaSede;

const setMetaSede = async function (req, res) {
        const idorg = managerFilter.getInfoToken(req,'idorg');
        const idsede = managerFilter.getInfoToken(req, 'idsede');
        const metas = req.body;        
        
        
        let read_query = `call procedure_insert_update_metas(${idorg},${idsede},'${JSON.stringify(metas)}')`;
        console.log(read_query);
         sequelize.query(read_query, {type: sequelize.QueryTypes.SELECT})
                .then(function (rows) {
                        return ReS(res, {
                                data: rows
                        });
                })
                .catch((err) => {
                        return ReE(res, err);
                });

}
module.exports.setMetaSede = setMetaSede;

const getVentas = async function (req, res) {
	const idorg = managerFilter.getInfoToken(req,'idorg');
	const idsede = managerFilter.getInfoToken(req, 'idsede');

	// let read_query = `
	// SELECT * , DATE_FORMAT(CURDATE(), '%d/%m/%Y') as f_actual
	// from registro_pago_detalle as rpd
	// 	inner join registro_pago as rp using(idregistro_pago)
	// 	inner join tipo_pago as tp using(idtipo_pago)
	// 	left join cliente as c using(idcliente)
	// where(rp.idorg = ${idorg} and rp.idsede = ${idsede}) and(rp.estado = 0 and rpd.estado = 0)
	// order by rp.idregistro_pago desc
	// `;

	let read_query = `
	SELECT *, rp.total as importe , DATE_FORMAT(CURDATE(), '%d/%m/%Y') as f_actual
	from registro_pago as rp		
		left join cliente as c using(idcliente)
	where(rp.idorg = ${idorg} and rp.idsede = ${idsede}) and(rp.estado = 0)
	order by rp.idregistro_pago desc
	`;
	console.log(read_query);
	sequelize.query(read_query, {type: sequelize.QueryTypes.SELECT})
		.then(function (rows) {
			return ReS(res, {
				data: rows
			});
		})
		.catch((err) => {
			return ReE(res, err);
		});

}
module.exports.getVentas = getVentas;

const getConsumo = async function (req, res) {
	const idorg = managerFilter.getInfoToken(req,'idorg');
	const idsede = managerFilter.getInfoToken(req, 'idsede');

	// let read_query = `
	// SELECT * , CONCAT(p.fecha,' ',p.hora) fecha_hora_a, rpd.importe as total_a
	// from registro_pago_pedido as rpp
	// 	inner JOIN registro_pago_detalle as rpd on rpp.idregistro_pago=rpd.idregistro_pago
	// 	inner JOIN pedido_detalle as pd using(idpedido_detalle)
	// 	inner JOIN pedido as p on pd.idpedido = p.idpedido
	// 	inner JOIN tipo_consumo as tp on tp.idtipo_consumo = pd.idtipo_consumo
	// where p.idorg=${idorg} and p.idsede=${idsede}
	// `;

	let read_query = `
	SELECT *, CONCAT(p.fecha,' ',p.hora) fecha_hora_a, pd.ptotal_r as total_a, tpc.descripcion as tpc_descripcion
	from pedido as p	
		inner join pedido_detalle as pd on p.idpedido=pd.idpedido
		inner join tipo_consumo as tpc on pd.idtipo_consumo = tpc.idtipo_consumo
		inner join seccion as s on pd.idseccion=s.idseccion
		inner join categoria as c on pd.idcategoria=c.idcategoria
		left join item as i on pd.iditem=i.iditem
	where p.idorg=${idorg} and p.idsede=${idsede} and (p.estado=2 and pd.estado=0)	
	`;

	console.log(read_query);
	sequelize.query(read_query, {type: sequelize.QueryTypes.SELECT})
		.then(function (rows) {
			return ReS(res, {
				data: rows
			});
		})
		.catch((err) => {
			return ReE(res, err);
		});

}
module.exports.getConsumo = getConsumo;