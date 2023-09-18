const mongoose = require('mongoose');
const User = require('./userModel');
const Product = require('./productModel');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require,
  },
  product: [
    {
      type: mongoose.Types.ObjectId,
      ref: Product,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
