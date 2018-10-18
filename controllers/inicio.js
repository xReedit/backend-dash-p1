let express = require("express"); 
var router = express.Router();

router.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello desde version 1' })
});