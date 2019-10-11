// 

let express = require("express");
let router = express.Router();

const apiPwaAppPedidos = require('../controllers/apiPwaAppPedidos');
const login = require('../controllers/login');
const auth = require('../middleware/autentificacion');

router.get('/', function (req, res, next) {
	res.json({
		status: "success",
		message: "API V3",
		data: {
			"version_number": "v1.0.0"
		}
	})
});

// PWA-APP PEDIDO //
// PWA-APP PEDIDO //


router.post('/login-usuario-autorizado', login.loggerUsAutorizado);
router.post('/verificarToken', auth.verificarToken);


module.exports = router;