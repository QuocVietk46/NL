const mongoose = require('mongoose');
const Image = require('./imageModel');
const Rate = require('./rateModel');
const User = require('./userModel');

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: User,
    require,
  },
  rate: {
    type: mongoose.Types.ObjectId,
    ref: Rate,
  },
  image: [
    {
      type: mongoose.Types.ObjectId,
      ref: Image,
    },
  ],
  content: {
    type: String,
    require,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
