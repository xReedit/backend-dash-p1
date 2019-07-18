// 

let express = require("express");
const router = express.Router();

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

router.post('/login', login.logger);
router.post('/verificarToken', auth.verificarToken);

router.get('/estadistica/init', apiEstadistica.init);
router.get('/estadistica/getMetaSede', auth.verificarToken, apiEstadistica.getMetaSede);
router.post('/estadistica/setMetaSede', auth.verificarToken, apiEstadistica.setMetaSede);

router.get('/estadistica/getVentas', auth.verificarToken, apiEstadistica.getVentas);
router.get('/estadistica/getConsumo', auth.verificarToken, apiEstadistica.getConsumo);
router.get('/estadistica/getFechaNow', apiEstadistica.getFechaNow);

module.exports = router;