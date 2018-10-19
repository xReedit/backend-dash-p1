let express = require("express"); 
var router = express.Router();

router.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello desde inicio version 1' })
});

module.exports = router;