const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
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
  content: {
    type: String,
    require,
  },
  rate: {
    type: mongoose.Types.ObjectId,
    ref: 'Rate',
  },
});

const Comments = mongoose.model('Comments', commentSchema);
module.exports = Comments;
