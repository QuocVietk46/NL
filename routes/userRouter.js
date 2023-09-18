const { getAllProducts } = require('../controllers/productController');

const router = require('express').Router();

router.get('/products', getAllProducts);

module.exports = router;
