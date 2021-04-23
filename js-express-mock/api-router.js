var api = require('./api-methods'); 
var express = require('express');

const router = express.Router();
api.apiMethods(router);

module.exports = router;