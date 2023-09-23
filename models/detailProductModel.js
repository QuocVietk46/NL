const mongoose = require('mongoose');

const detailSchema = new mongoose.Schema({
  color: {
    name: {
      type: String,
      require,
    },
    code: {
      type: String,
      require,
    },
  },
  size: {
    type: String,
    require,
  },
  sale: {
    type: Number,
    require,
  },
  price: {
    type: Number,
    require,
  },
  quantity: {
    type: Number,
    require,
  },
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;
