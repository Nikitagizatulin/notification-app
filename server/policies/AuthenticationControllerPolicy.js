const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      userName: Joi.string().min(3).max(150).required().label('User Name'),
      password: Joi.string()
        .required()
        .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/),
      confirmPassword: Joi.string()
        .required()
        .valid(Joi.ref('password'))
        .messages({ 'any.only': '{{#label}} does not match' }),
    });
    schema
      .validateAsync(req.body)
      .then(() => {
        next();
      })
      .catch((err) => {
        switch (err.details[0].context.key) {
          case 'email':
            res.status(400).send({
              error: 'Invalid email address',
            });
            break;
          case 'password':
            res.status(400).send({
              error: 'Incorrect password format',
            });
            break;
          case 'confirmPassword':
            res.status(400).send({
              error: 'Password and password confirmation mismatch',
            });
            break;
          default:
            res.status(400).send({
              error: 'An error occurred during registration',
            });
        }
      });
  },
  login(req, res, next) {
    const schema = Joi.object({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    });
    schema
      .validateAsync(req.body)
      .then(() => {
        next();
      })
      .catch((err) => {
        switch (err.details[0].context.key) {
          case 'email':
          case 'password':
            res.status(400).send({
              error: 'Invalid email or password!',
            });
            break;
          default:
            res.status(400).send({
              error: 'An error occurred while logging in',
            });
        }
      });
  },
};
