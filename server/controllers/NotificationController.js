const { Notification } = require('../models');

module.exports = {
  async getNotification(req, res) {
    try {
      const user = await Notification.create({
        email: req.body.email,
        password: req.body.password,
        user_name: req.body.userName,
      });

      return res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON()),
      });
    } catch (e) {
      return res.status(400).send({
        error: 'An error occurred during registration',
      });
    }
  },
  async updateNotification(req, res) {
    try {
      const user = await Notification.create({
        email: req.body.email,
        password: req.body.password,
        user_name: req.body.userName,
      });

      return res.send({
        user: user.toJSON(),
        token: jwtSignUser(user.toJSON()),
      });
    } catch (e) {
      return res.status(400).send({
        error: 'An error occurred during registration',
      });
    }
  },
};
