const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    require,
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    require,
  },
  value: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    require,
  },
});

const Rate = mongoose.model('Rate', rateSchema);
module.exports = Rate;
