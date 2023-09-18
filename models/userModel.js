const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      require,
    },
    phone: {
      type: Number,
      min: 10,
      max: 10,
      require,
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
