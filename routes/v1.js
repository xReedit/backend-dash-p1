let express = require("express"); 
const router = express.Router();

const api2 = require('../controllers/api2');
const login = require('../controllers/login');

const auth = require('../middleware/autentificacion');

var pruebaController = require('../controllers/prueba');



router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})    
});

router.get('/modelos/prueba', pruebaController.getAll);

router.post('/api/:table/create', auth.verificarToken, api2.create);
router.get('/api/:table/getall',api2.getAll);
router.put('/api/:table/update/:id', auth.verificarToken, api2.update);
router.delete('/api/:table/remove/:id', auth.verificarToken, api2.remove);
router.put('/api/:table/removeLogic/:id', auth.verificarToken, api2.removelogic);

router.get('/api/:table/getById/:id',api2.getById);
router.get('/api/:table/getall/getFilterBy/:filter',api2.getFilterBy);
router.get('/api/:table/getpagination/getFilterBy/:filter',api2.getPagination);


router.post('/login', login.logger);


module.exports = router;