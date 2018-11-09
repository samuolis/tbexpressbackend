var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

// GET User info
router.get('/', user_controller.user_get);

module.exports = router;
