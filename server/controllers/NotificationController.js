const { Notification } = require('../models');

module.exports = {
  async getNotification(req, res) {
    try {
      const notification = await Notification.findOne({
        where: { user_id: req.user.id },
      }) || {};
      return res.send({
        notification,
      });
    } catch (e) {
      return res.status(400).send({
        error: 'An error occurred during registration',
      });
    }
  },
  async updateNotification(req, res) {
    try {
      let notification = await Notification.findOne({
        where: { user_id: req.user.id },
      });
      const data = {
        search_query: req.body.searchQuery,
        interval: req.body.interval,
      };
      if (req.body.interval === 'weekly') {
        data.days = req.body.days;
        data.time = req.body.time;
      }
      if (req.body.interval === 'daily') {
        data.time = req.body.time;
      }
      if (notification) {
        await notification.update({
          days: null,
          time: null,
          ...data
        });
      } else {
        notification = await Notification.create({
          ...data,
          user_id: req.user.id,
        });
      }

      return res.send({
        notification,
      });
    } catch (e) {
      return res.status(400).send({
        error: 'An error occurred during registration',
      });
    }
  },
};
