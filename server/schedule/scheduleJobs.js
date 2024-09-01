const schedule = require('node-schedule');
const { Notification, User } = require('../models');
const moment = require('moment')
const { sendMail } = require('../emails/templateEmail');

exports.initScheduledJobs = () => {
  const job = schedule.scheduleJob('* * * * *', async function () {
    const notifications = await Notification.findAll({
      include: [
        {
          model: User,
          required: true,
          as: 'user',
        },
      ],
    });
    const now = moment();
    const templateId = 'd-042ca6885a8c4159a4ee9043937da99f';
    // for (const notification of notifications) {
    //   const { interval, time, days, sent_at, user, search_query } =
    //     notification;
    //   const lastSent = moment(sent_at);

    //   if (interval === 'hourly') {
    //     if (!sent_at || now.diff(lastSent, 'hours') >= 1) {
    //       sendMail(user.email, templateId, {
    //         searchQuery: search_query,
    //         userName: user.user_name,
    //       });
    //       notification.sent_at = now; // update sent_at timestamp
    //       await notification.save();
    //     }
    //   }

    //   if (interval === 'daily') {
    //     const [hours, minutes] = time.split(':').map(Number);
    //     const scheduleTime = moment().set({ hour: hours, minute: minutes });

    //     if (
    //       now.isSame(scheduleTime, 'minute') &&
    //       (!sent_at || !lastSent.isSame(now, 'day'))
    //     ) {
    //       sendMail(user.email, templateId, {
    //         searchQuery: search_query,
    //         userName: user.user_name,
    //       });
    //       notification.sent_at = now; // update sent_at timestamp
    //       await notification.save();
    //     }
    //   }

    //   if (interval === 'weekly') {
    //     const [hours, minutes] = time.split(':').map(Number);
    //     const scheduleTime = moment().set({ hour: hours, minute: minutes });

    //     if (
    //       days.includes(now.format('dddd')) &&
    //       now.isSame(scheduleTime, 'minute') &&
    //       (!sent_at ||
    //         !lastSent.isSame(now, 'week') ||
    //         !lastSent.isSame(now, 'day'))
    //     ) {
    //       sendMail(user.email, templateId, {
    //         searchQuery: search_query,
    //         userName: user.user_name,
    //       });
    //       notification.sent_at = now; // update sent_at timestamp
    //       await notification.save();
    //     }
    //   }
    // }

    console.log(`All notification sent`);
  });
};
