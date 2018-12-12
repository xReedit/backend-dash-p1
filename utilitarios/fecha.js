let fecha = {
        getFechaActual: () => {                
                return new Date().toJSON().slice(0, 10);
        },
        getHoraActual: () => {
                return new Date().toLocaleTimeString();
        }
}

module.exports = fecha;