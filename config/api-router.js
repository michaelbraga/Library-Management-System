var express = require('express');
var router = express.Router();

require(__dirname + '/api/anonymous')(router);
require(__dirname + '/api/admin')(router);
require(__dirname + '/api/borrower')(router);

module.exports = router;
