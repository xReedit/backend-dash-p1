const { to, ReE, ReS} = require('../service/uitl.service');
const models = require('../models');
const managerFilter = require('../utilitarios/filters');

const sequelize = require('sequelize');
const Op = sequelize.Op;

const getAll = async function (req, res) {
        const nomTabla = req.params.table;
        const orden = req.query.orden ? managerFilter.getOrderModel(req.query.orden, req.query.ordendireccion) : '';
        const model = models[nomTabla];

        model.findAll({
                include: [{ all: true, nested: true }],
                order: orden
        })
        .then(datos => ReS(res, {data: datos}))
        .catch(err => ReE(res, err));
}
module.exports.getAll = getAll;


const getById = async function (req, res) {
        const nomTabla = req.params.table;
        const nomId = 'id' + nomTabla;
        const valId = req.params.id;
        const model = models[nomTabla];        
        
        let _where = {};        
        _where[nomId] = valId;
        
        model.findAll({
                include: [{ all: true, nested: true }],
                where: _where
        })
        .then(datos => ReS(res, {data: datos}))
        .catch(err => ReE(res, err));
}
module.exports.getById = getById;


const getFilterBy = async function (req, res) {
        const nomTabla = req.params.table;                
        const model = models[nomTabla];
        
        const orden = req.query.orden ? managerFilter.getOrderModel(req.query.orden, req.query.ordendireccion) : '';
        let filtros = managerFilter.getFiltersModel(req.params.filter);

        console.log('filtros ', filtros);
        
        // where: [{idorg: 2, idorg: [1], idsede: 1}],

        model.findAll({
                include: [{ all: true, nested: true }],
                where: filtros,
                order: orden
        })
        .then(datos => ReS(res, {data: datos}))
        .catch(err => ReE(res, err));
}
module.exports.getFilterBy = getFilterBy;


const getPagination = async function (req, res) {
        const nomTabla = req.params.table;
        const model = models[nomTabla];

        console.log('req.params.filter ', req.params.filter);
        const orden = req.query.orden ? managerFilter.getOrderModel(req.query.orden, req.query.ordendireccion) : '';
        let filtros = managerFilter.getFiltersModel(req.params.filter);

        const limit = req.query.rows;
        const page = req.query.pagenumber ? req.query.pagenumber : Number(0);
        const offset = (page - 1) * limit;

        console.log('orden', orden);
        //Calculate pages
        const next = Number(page) + 1;
                
        model.findAndCountAll({
                        include: [{ all: true, nested: true }],              
                                limit: parseInt(limit),
                                offset: offset,
                                where: filtros,
                                order: orden, 
                                logging: (sql)=>{console.log(sql);}
                }).then(data => {                        
                        const CountTotal = data.count;
                        const last = Math.ceil(CountTotal / limit);

                        // model.findAll({
                        //         include: [{ all: true, nested: true }],              
                        //         limit: parseInt(limit),
                        //         offset: offset,
                        //         where: filtros,
                        //         order: orden
                        // })
                        // .then(datos => 
                                ReS(res, {
                                data: data.rows,
                                pages: { 
                                        "next": next > last ? last : next,
                                        "page": Number(page),
                                        "last": last,
                                        "totalCount": CountTotal
                                }
                        })                        
                        }).catch(err => ReE(res, err));
}
module.exports.getPagination = getPagination;