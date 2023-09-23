const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require,
    },
    details: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'DetailProduct',
      },
    ],
    describe: {
      type: String,
      require,
    },
    category: {
      type: String,
      enum: ['shorts', 'pants', 't-shirts', 'jackets'],
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
      enum: ['available', 'unavailable', 'stopped'],
      require,
    },
    images: [
      {
        filename: {
          type: String,
          require,
        },
        path: {
          type: String,
          require,
        },
      },
    ],
    rates: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Rate',
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
