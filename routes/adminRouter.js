const imageController = require('../controllers/imageController');
const productController = require('../controllers/productController');
const upload = require('../config');

const router = require('express').Router();

router.post(
  '/products/create',
  upload.array('images', 10),
  productController.createProduct
);
router.patch('/products/:id', productController.updateProduct);
router.patch(
  '/products/images/:id',
  upload.array('images', 10),
  productController.updateProductImage
);
router.delete('/products/:id', productController.deleteProduct);
router.get('/images', imageController.getAllImage);

module.exports = router;
