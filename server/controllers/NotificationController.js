const { Notification } = require('../models');

module.exports = {
  async getNotification(req, res) {
    try {
      const notification = await Notification.findOne({ where: { user_id: req.user.id } });
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
      let notification = await Notification.findOne({ where: { user_id: req.user.id } });
      if(notification){
        await notification.update({
          user_id: req.user.id,
          search_query: req.body.searchQuery,
          interval: req.body.interval,
          days:  req.body.days,
          time: req.body.time,
        })
      }else{
         notification = await Notification.create({
           user_id: req.user.id,
           search_query: req.body.searchQuery,
           interval: req.body.interval,
           days:  req.body.days,
           time: req.body.time,
         });
      }

      return  res.send({
        notification,
      });
    } catch (e) {
      return res.status(400).send({
        error: 'An error occurred during registration',
      });
    }
  },
};
