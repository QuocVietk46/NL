const mongoose = require('mongoose');
const Image = require('./imageModel');
const Comment = require('./commentModel');
const User = require('./userModel');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    describe: {
      type: String,
      require,
    },
    price: {
      type: Number,
      require,
    },
    sale: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['available', 'unavailable', 'stop'],
      require,
    },
    image: [
      {
        type: mongoose.Types.ObjectId,
        ref: Image,
        require,
      },
    ],
    rate: [
      {
        type: mongoose.Types.ObjectId,
        ref: User,
      },
    ],
    comment: [
      {
        type: mongoose.Types.ObjectId,
        ref: Comment,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
