const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require,
  },
  products: [
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        require,
      },
      color: {
        type: mongoose.Types.ObjectId,
        ref: 'Color',
        require,
      },
      sale: {
        type: Number,
        require,
      },
      amount: {
        type: Number,
        require,
      },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'success', 'delivery', 'fail'],
    require,
  },
  order_date: {
    type: Date,
    require,
  },
  delivery_date: {
    type: Date,
    validate(value) {
      if (value < this.order_date) {
        throw new Error('Delivery date must be greater than order date');
      }
    },
  },
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
