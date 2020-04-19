const express = require('express');

const buyersControllers = require('../controllers/buyers-controllers');
const router = express.Router();

router.get('/', buyersControllers.getProducts);

module.exports = router;