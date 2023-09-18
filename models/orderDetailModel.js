const mongoose = require('mongoose');
const User = require('./userModel');
const Product = require('./productModel');

const orderDetailSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: Product,
    require,
  },
  sale: {
    type: Number,
  },
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);
module.exports = OrderDetail;
