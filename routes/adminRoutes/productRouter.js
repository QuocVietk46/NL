const router = require('express').Router();
const products = require('../../configs/products.json');

const productController = require('../../controllers/productController');
const upload = require('../../configs/multer');
const Product = require('../../models/productModel');

router.get('/', productController.find);
router.get('/:id', productController.findById);
router.get('/search/fast', productController.fastSearch);

router.post('/', upload.array('images', 10), productController.create);

router.patch('/:id', upload.array('images', 10), productController.update);

router.delete('/:id', productController.delete);

// router.post('/', async (req, res) => {
//   try {
//     await Product.insertMany(products);
//     return res.status(201).json({ success: true });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

module.exports = router;
