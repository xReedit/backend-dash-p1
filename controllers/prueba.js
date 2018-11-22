const {
        to,
        ReE,
        ReS
} = require('../service/uitl.service');


// const db = require('../modelos/index');
// const db = require('../models/index');

// , nested: true

var models = require('../models');

const getAll = async function (req, res) {
        const prueba = models.producto;
        prueba.findAll({
                include: [{ all: true, nested: true }]
        })
        .then(datos => ReS(res, {data: datos}))
        .catch(err => ReE(res, err));
}

module.exports.getAll = getAll;