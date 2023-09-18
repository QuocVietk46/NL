const mongoose = require('mongoose');
const User = require('./userModel');
const Product = require('./productModel');
const OrderDetail = require('./orderDetailModel');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require,
  },
  detail: [
    {
      type: mongoose.Types.ObjectId,
      ref: OrderDetail,
      require,
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'success', 'delivery', 'fail'],
    require,
  },
  date_order: {
    type: Date,
    require,
  },
  date_deliver: {
    type: Date,
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
