const schedule = require('node-schedule');
const { Op } = require('sequelize');

exports.initScheduledJobs = () => {
    const job = schedule.scheduleJob('* * * * *', async function () {
        // const date = new Date();
        // const users = await User.findAll({
        //     include: [
        //         {
        //             model: VerificationToken,
        //             required: true,
        //             as: 'verificationToken',
        //             where: {
        //                 token_type: enumTokenTypesConstants.EMAIL_VERIFICATION,
        //                 created_at: {
        //                     [Op.lt]: date.setHours(date.getHours() - 1),
        //                 },
        //             },
        //         },
        //     ],
        // });

        // await VerificationToken.destroy({
        //     where: {
        //         token_type: enumTokenTypesConstants.EMAIL_VERIFICATION,
        //         user_id: users.map((user) => user.id),
        //     },
        // });
        // const userDeletedCount = await User.destroy({
        //     where: {
        //         id: users.map((user) => user.id),
        //     },
        // });
        // console.log(`${userDeletedCount} users deleted`);
    });
};
