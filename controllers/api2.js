const { to, ReE, ReS }  = require('../service/uitl.service');
let Sequelize = require('sequelize');
let config = require('../config');
let managerFilter = require('../utilitarios/filters');
let BuildSql = require('../service/buildsql.service');


let sequelize = new Sequelize(config.database, config.username, config.password, config.sequelizeOption);
let TABLE_PREFIX = config.table_prefix;

let mysql_clean = function (string) {
    return sequelize.getQueryInterface().escape(string);
};

const init = async function(req, res){
    return ReS(res, {message:'hello desde LA API GENERAL 2 INIT version 1'});    
}
module.exports.init = init;

const create = async function(req, res){
    if(JSON.stringify(req.body) == '{}') {        
        return ReE(res, 'Faltan parametros')                
    }
	const values = BuildSql.Insert(req);
	
	sequelize.query("INSERT INTO `" + (TABLE_PREFIX + req.params.table) + values, { type: sequelize.QueryTypes.INSERT})
	
	.then(function(id) {
        return ReS(res, {id:id});    
	}).catch((err)=> {return ReE(res, err);});

}
module.exports.create = create;


const update = async function(req, res){
    sequelize.query("SHOW KEYS FROM `" + ( TABLE_PREFIX + req.params.table ) + "` WHERE Key_name = 'PRIMARY'", { type: sequelize.QueryTypes.SELECT})
		.then(function(keys) {
			let primary_key = keys[0].Column_name;
			if(JSON.stringify(req.body) == '{}') {
				return ReE(res, {message: 'Faltan parametros'})  				
			}
            
        //     let update_string = '';
	// 		Object.keys(req.body).forEach(function(key, index) {
	// 			let val = req.body[key];
	// 			update_string += "`" + key + "` = " + mysql_clean(val); 
	// 			if(Object.keys(req.body).length != (index+1)) {
	// 				update_string += ',';
	// 			}
	// 		});			
	    
	    const update_string = BuildSql.update(req);
	    console.log('update_string', update_string);
            sequelize.query("UPDATE `" + ( TABLE_PREFIX + req.params.table ) + "` SET " + update_string + " WHERE `"+ primary_key +"` = "+mysql_clean(req.params.id), { type: sequelize.QueryTypes.UPDATE})
			.then(function() {				
                return ReS(res, {message:'Update'});  
			})
			.catch((err)=> {return ReE(res, err);});
		})
		.catch((err)=> {return ReE(res, err);});
}
module.exports.update = update;


const getAll = async function(req, res){
    //orden
    const orden = req.query.orden ? managerFilter.getOrder(req.query.orden, req.query.ordendireccion) : '';
            
    let read_query = "SELECT * FROM `" + ( TABLE_PREFIX + req.params.table ) + "` "+orden;
    sequelize.query(read_query, { type: sequelize.QueryTypes.SELECT})
		.then(function(rows) {
			return ReS(res, {data:rows});			
		})
		.catch((err)=> {return ReE(res, err);});
        
}
module.exports.getAll = getAll;


const getById = async function(req, res){
    sequelize.query("SHOW KEYS FROM `"+TABLE_PREFIX+req.params.table+"` WHERE Key_name = 'PRIMARY'", { type: sequelize.QueryTypes.SELECT})
		.then(function(keys) {
			let primary_key = keys[0].Column_name;
			sequelize.query("SELECT * FROM `"+TABLE_PREFIX+req.params.table+"` WHERE `"+ primary_key +"` = " + mysql_clean(req.params.id), { type: sequelize.QueryTypes.SELECT})
			.then(function(rows) {
				return ReS(res, {data:rows});
			})
			.catch((err)=> {return ReE(res, err);});
		})
		.catch((err)=> {return ReE(res, err);});
}
module.exports.getById = getById;


const getFilterBy = async function(req, res){
    let filtros = managerFilter.getFilters(req.params.filter);
    console.log(filtros);
    const orden = req.query.orden ? managerFilter.getOrder(req.query.orden, req.query.ordendireccion) : '';

    let read_query = "SELECT * FROM `"+TABLE_PREFIX+req.params.table+"` WHERE "+ filtros + orden;
    console.log(read_query);

    sequelize.query(read_query, { type: sequelize.QueryTypes.SELECT})
		.then(function(rows) {
            return ReS(res, {data:rows});
		})
		.catch((err)=> {return ReE(res, err);});
}
module.exports.getFilterBy = getFilterBy;


const getPagination = async function(req, res){
	let filtros = managerFilter.getFilters(req.params.filter);
	//cuneta el total de filas TotalCount
	sequelize.query("SELECT count(*) as TotalCount FROM `"+TABLE_PREFIX+req.params.table+"` WHERE "+ filtros, { type: sequelize.QueryTypes.SELECT})
	.then(function(rows) {

		// cocinar la paginacion
		// total de registros
		const TotalCount= rows[0].TotalCount;

		//orden
		const orden = req.query.orden ? managerFilter.getOrder(req.query.orden, req.query.ordendireccion) : '';

		const page_rows = req.query.rows || page_limit;
		const page = req.query.pagenumber ? req.query.pagenumber : Number(0);
		const offset = (page-1) * page_rows;

		//Calculate pages
		const next = Number(page)+1;
		// const previous = page === 0 ? page : Number(page)-1;		

		const read_query = "SELECT * FROM `" + ( TABLE_PREFIX + req.params.table ) + "` WHERE "+ filtros + orden + " LIMIT "+page_rows+" OFFSET "+offset;
					
		// paginacion
		sequelize.query(read_query, { type: sequelize.QueryTypes.SELECT})
		.then(function(rows) {
			let last = Math.ceil(TotalCount/page_rows);
			return ReS(res, {
				data:rows,
				pages : {
					"next": next > last ? last : next,					
					"page": Number(page),
					"last": last,
					"totalCount": TotalCount
				}
			});
		})
		.catch((err)=> {return ReE(res, err);});

	}).catch((err)=> {return ReE(res, err);});
}
module.exports.getPagination = getPagination;


const remove = async function(req, res){

	sequelize.query("SHOW KEYS FROM `"+TABLE_PREFIX+req.params.table+"` WHERE Key_name = 'PRIMARY'", { type: sequelize.QueryTypes.SELECT})
		.then(function(keys) {
			var primary_key = keys[0].Column_name;
			sequelize.query("DELETE FROM `"+TABLE_PREFIX+req.params.table+"` WHERE `"+ primary_key +"` = "+mysql_clean(req.params.id), { type: sequelize.QueryTypes.DELETE})
			.then(function() {				
				return ReS(res, {message: "Deleted"});
			})
			.catch((err)=> {return ReE(res, err);});
		})
		.catch((err)=> {return ReE(res, err);});

}
module.exports.remove = remove;


// borrado logico -> cambia estado = 1;
const removelogic = async function(req, res){
    sequelize.query("SHOW KEYS FROM `"+TABLE_PREFIX+req.params.table+"` WHERE Key_name = 'PRIMARY'", { type: sequelize.QueryTypes.SELECT})
		.then(function(keys) {
			var primary_key = keys[0].Column_name;
			sequelize.query("UPDATE `"+TABLE_PREFIX+req.params.table+"`SET estado=1 WHERE `"+ primary_key +"` = "+mysql_clean(req.params.id), { type: sequelize.QueryTypes.UPDATE})
			.then(function() {				
				return ReS(res, {message: "Deleted"});
			})
			.catch((err)=> {return ReE(res, err);});
		})
		.catch((err)=> {return ReE(res, err);});
}
module.exports.removelogic = removelogic;