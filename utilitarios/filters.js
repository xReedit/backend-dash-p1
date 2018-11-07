
let filter = {
    getFilters: (filtros) => {
        // traduce los operadores ej: categoria/filterBy/estado=0-y-idsede=1-o-idorg=0
        let rpt = filtros.replace(/-y-/g, ' and ');
        rpt = rpt.replace(/-o-/g, ' or ');

        rpt = rpt.replace(/-contains-/g, ' like ');
        rpt = rpt.replace(/!/g, '%'); // para like
        rpt = rpt.replace(/-eq-/g, '='); //eq => igual
        return rpt;        
    },
    getOrder: (orden, direccion) => {
        const orderDireccion = direccion === '' ? 'ASC' : direccion || 'ASC';
        return ` ORDER BY ${orden} ${orderDireccion.toUpperCase()}`;
    },

    getInfoToken: (req, key) => {
        // obtiene los valores del token segun key: idorg=idorg => val a buscar idorg
        return req.usuariotoken[key] || null;
    }
}

module.exports = filter;

