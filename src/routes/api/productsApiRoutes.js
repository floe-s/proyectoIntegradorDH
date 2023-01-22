const express = require('express');
const router = express.Router();

const productsApi = require('../../services/productosService');

router.get('/all-products', productsApi.getAllProducts);
router.get('/last-products', productsApi.lastAdded);

module.exports = router;