const {
        to,
        ReE,
        ReS
} = require('../service/uitl.service');


const db = require('../modelos/index');

const getAll = async function (req, res) {
        console.log(db.mainDb.prueba);
        db.mainDb.prueba.findAll({
                        include: [db.mainDb.test]
                }).then(datos => {
                return ReS(res, {
                        data: datos
                }).catch((err) => {
                        return ReE(res, err);
                });
        })
}

module.exports.getAll = getAll;