const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require,
    },
    email: {
      type: String,
      require,
      unique: true,
    },
    phone: {
      type: String,
      require,
      min: 10,
      max: 10,
      unique: true,
    },
    password: {
      type: String,
      min: 8,
      max: 20,
      require,
    },
    address: [
      {
        type: String,
      },
    ],
    cart: {
      type: mongoose.Types.ObjectId,
      ref: 'Cart',
    },
    //user email
    email: {
      type: String,
      require,
    },
    //user role (true - normal user, false - admin)
    role: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
