const Joi = require('joi');

module.exports = {
  notificationUpdate(req, res, next) {
    const schema = Joi.object({
      searchQuery: Joi.string().min(3).max(250).required(),
      interval: Joi.string().valid('hourly', 'daily', 'weekly').required(),
      days: Joi.when('interval', {
        is: Joi.string().valid('weekly'),
        then: Joi.array()
          .items(Joi.string().valid('su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'))
          .required(),
        otherwise: Joi.optional(),
      }),
      time: Joi.when('interval', {
        is: Joi.string().valid('weekly', 'daily'),
        then: Joi.string()
          .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
          .required(),
        otherwise: Joi.optional(),
      }),
    });
    schema
      .validateAsync(req.body, { stripUnknown: true })
      .then(() => {
        next();
      })
      .catch(({ details }) => {
        const message = details.map((i) => i.message).join(',');
        res.status(422).json({ error: message });
      });
  },
};
