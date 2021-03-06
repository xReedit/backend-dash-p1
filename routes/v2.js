// 

let express = require("express");
let router = express.Router();

const apiEstadistica = require('../controllers/apiEstadistica');
const login = require('../controllers/login');
const auth = require('../middleware/autentificacion');

router.get('/', function (req, res, next) {
	res.json({
		status: "success",
		message: "API",
		data: {
			"version_number": "v1.0.0"
		}
	})
});

// ESTADISTICA - MODULO GERENCIAL //
// ESTADISTICA - MODULO GERENCIAL //
router.post('/login', login.logger);
router.post('/verificarToken', auth.verificarToken);

router.get('/estadistica/init', apiEstadistica.init);
router.get('/estadistica/getMetaSede', auth.verificarToken, apiEstadistica.getMetaSede);
router.post('/estadistica/setMetaSede', auth.verificarToken, apiEstadistica.setMetaSede);

router.get('/estadistica/getVentas', auth.verificarToken, apiEstadistica.getVentas);
router.get('/estadistica/getVentasNowRP', auth.verificarToken, apiEstadistica.getVentasNowRP); // time real registro de pago
router.get('/estadistica/getEICajaNowRP', auth.verificarToken, apiEstadistica.getEICajaNowRP); // time real ei caja
router.get('/estadistica/getPedidoNowRP', auth.verificarToken, apiEstadistica.getPedidoNowRP); // time real PEDIDOS
router.get('/estadistica/getVentasHoy', auth.verificarToken, apiEstadistica.getVentasHoy); // VENTAS CAJA ULTIMO 15 DIAS
router.get('/estadistica/getMovCajaHoy', auth.verificarToken, apiEstadistica.getMovCajaHoy); // movimientos caja ie hoy
router.get('/estadistica/getItemBorradosHoy', auth.verificarToken, apiEstadistica.getItemBorradosHoy); // items borrados hoy

router.post('/estadistica/getMovCaja', auth.verificarToken, apiEstadistica.getMovCaja); // movimientos caja ie con date filter range
router.post('/estadistica/getItemBorrados', auth.verificarToken, apiEstadistica.getItemBorrados); // items borrados  con date filter range
router.post('/estadistica/getVentaDetalle', auth.verificarToken, apiEstadistica.getVentaDetalle); // items borrados  con date filter range
router.post('/estadistica/getConsumoDetalle', auth.verificarToken, apiEstadistica.getConsumoDetalle); // consumo detalles


router.get('/estadistica/getConsumo', auth.verificarToken, apiEstadistica.getConsumo);
router.get('/estadistica/getFechaNow', apiEstadistica.getFechaNow);



// INFO COMPONENTES
router.get('/estadistica/getSedes', auth.verificarToken, apiEstadistica.getSedes);

// PUNTO DE EQUILIBRIO
// ingresos y gastos 
router.post('/estadistica/getIngresosGastos', auth.verificarToken, apiEstadistica.getIngresosGastos);

module.exports = router;