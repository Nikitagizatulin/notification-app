const jwt = require('jsonwebtoken');
const { User } = require('../models');

function jwtSignUser(user) {
  const ONE_WEEK = 60 * 60 * 24 * 7;
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: ONE_WEEK,
  });
}

module.exports = {
  async register(req, res) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password,
        user_name: req.body.userName,
      });

      return res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON()),
      });
    } catch (e) {
      if (e.original?.code === 'ER_DUP_ENTRY') {
        return res.status(400).send({
          error: 'This email is already in use.',
        });
      } else {
        return res.status(400).send({
          error: 'An error occurred during registration',
        });
      }
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).send({
          error: 'There is no user with this email address',
        });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(400).send({
          error: 'Incorrect passwordНажмите, чтобы использовать этот вариант',
        });
      }

      return res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON()),
      });
    } catch (e) {
      return res.status(500).json({
        error: 'An error occurred while logging in',
      });
    }
  },
};
