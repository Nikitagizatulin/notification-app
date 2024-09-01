const AuthenticationController = require('./controllers/AuthenticateController');
const NotificationController = require('./controllers/NotificationController');

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy');
const NotificationControllerPolicy = require('./policies/NotificationControllerPolicy');

const UserAuthenticatedMiddleware = require('./middlewares/UserAuthenticated');

module.exports = (app) => {
  app.post(
    '/api/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post(
    '/api/login',
    AuthenticationControllerPolicy.login,
    AuthenticationController.login
  );
  app.get(
    '/api/notification-details',
    UserAuthenticatedMiddleware.userAuthenticated,
    NotificationController.getNotification
  );
  app.post(
    '/api/notification-details',
    UserAuthenticatedMiddleware.userAuthenticated,
    NotificationControllerPolicy.nitificationUpdate,
    NotificationController.updateNotification
  );
  require('./error')(app);
};
