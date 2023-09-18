const mongoose = require('mongoose');
const User = require('./userModel');

const rateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require,
  },
  value: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
});

const Rate = mongoose.model('Cart', rateSchema);
module.exports = Rate;
