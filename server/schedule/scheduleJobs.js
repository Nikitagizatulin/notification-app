const schedule = require('node-schedule');
const {Op} = require('sequelize');
const {Notification, User} = require('../models');

exports.initScheduledJobs = () => {
    const job = schedule.scheduleJob('* * * * *', async function () {
        const date = new Date();
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

        for (const notification of notifications) {
            const { interval, time, days, sent_at, user } = notification;
            const lastSent = moment(sent_at);

            if (interval === 'hourly') {
                if (!sent_at || now.diff(lastSent, 'hours') >= 1) {
                    await sendEmail(user, notification); // send email
                    notification.sent_at = now; // update sent_at timestamp
                    await notification.save();
                }
            }

            if (interval === 'daily') {
                const [hours, minutes] = time.split(':').map(Number);
                const scheduleTime = moment().set({ hour: hours, minute: minutes });

                if (now.isSame(scheduleTime, 'minute') && (!sent_at || !lastSent.isSame(now, 'day'))) {
                    await sendEmail(user, notification); // send email
                    notification.sent_at = now; // update sent_at timestamp
                    await notification.save();
                }
            }

            if (interval === 'weekly') {
                const [hours, minutes] = time.split(':').map(Number);
                const scheduleTime = moment().set({ hour: hours, minute: minutes });

                if (days.includes(now.format('dddd')) && now.isSame(scheduleTime, 'minute') &&
                    (!sent_at || !lastSent.isSame(now, 'week') || !lastSent.isSame(now, 'day'))) {
                    await sendEmail(user, notification); // send email
                    notification.sent_at = now; // update sent_at timestamp
                    await notification.save();
                }
            }
        }

        console.log(`All notification sent`);
    });
};
