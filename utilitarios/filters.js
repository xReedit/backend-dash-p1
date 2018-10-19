
let filter = {
    getFilters: (filtros) => {
        // traduce los operadores ej: categoria/filterBy/estado=0-y-idsede=1-o-idorg=0
        let rpt = filtros.replace(/-y-/g, ' and ');
        rpt = rpt.replace(/-o-/g, ' or ');
        rpt = rpt.replace(/-contains-/g, ' like ');
        rpt = rpt.replace(/!/g, '%'); // para like
        return rpt;        
    },
    getOrder: (orden, direccion) => {
        const orderDireccion = direccion === '' ? 'ASC' : direccion || 'ASC';
        return ` ORDER BY ${orden} ${orderDireccion.toUpperCase()}`;
    }
}

module.exports = filter;