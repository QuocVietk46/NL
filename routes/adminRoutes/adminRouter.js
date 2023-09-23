const productRouter = require('./productRouter');
const router = require('express').Router();

router.use('/products', productRouter);

module.exports = router;
