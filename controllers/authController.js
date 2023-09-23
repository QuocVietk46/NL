const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const User = require('../models/userModel');

const authController = {
  // GET - Register a User in the DB with password encryption
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }

      const existUser = await User.findOne({ email });
      if (existUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const user = await User.create({
        name,
        email,
        password: hashPassword,
      });

      return res.status(201).json({ user: user, success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET - Login a User in the DB and return JWT
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    const user = User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email is not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Password is invalid' });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.header('Authorization', 'Bear ' + accessToken);

    //save refreshToken to cookie with httpOnly
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/api/74454545/refresh_token',
      maxAge: 7 * 24 * 60 * 60 * 1000, //7days
    });

    return res.status(200).json({
      user: {
        ...user._doc,
        password: '',
      },
      success: true,
    });
  },

  // GET - Logout a User in the DB
  logout: async (req, res) => {
    try {
      res.clearCookie('refreshToken', { path: '/api/74454545/refresh_token' });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // GET - Refresh a User in the DB with new JWT
  refreshToken: async (req, res) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.status(400).json({ error: 'Please login now' });
      }

      JWT.verify(
        refreshToken,
        process.env.TOKEN_REFRESH_SECRET + user.password,
        (error, user) => {
          if (error) {
            return res.status(400).json({ error: 'Please login now' });
          }
          const accessToken = generateAccessToken(user);

          res.header('Authorization', 'Bear ' + accessToken);
          return res.status(200).json({ success: true });
        }
      );
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};

const generateAccessToken = (user) => {
  return JWT.sign({ _id: user._id }, process.env.TOKEN_ACCESS_SECRET, {
    expiresIn: '1d',
  });
};

const generateRefreshToken = (user) => {
  return JWT.sign(
    { _id: user._id },
    process.env.TOKEN_REFRESH_SECRET + user.password,
    {
      expiresIn: '7d',
    }
  );
};
module.exports = authController;
