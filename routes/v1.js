let express = require("express"); 
const router = express.Router();

const api2 = require('../controllers/api2');

router.get('/', function(req, res, next) {
    res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})    
});

// router.use('/inicio',inicioControler);
// router.use('/api',apiGeneral);

// router.use('/api2',api2.init);

router.post('/api/:table/create',api2.create);
router.get('/api/:table/getall',api2.getAll);
router.put('/api/:table/update/:id',api2.update);
router.delete('/api/:table/remove/:id',api2.remove);
router.put('/api/:table/removeLogic/:id',api2.removelogic);

router.get('/api/:table/getById/:id',api2.getById);
router.get('/api/:table/getall/getFilterBy/:filter',api2.getFilterBy);
router.get('/api/:table/getpagination/getFilterBy/:filter',api2.getPagination);



module.exports = router;