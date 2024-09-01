const sgMail = require('@sendgrid/mail');
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY); //your sendgrid api key

const sendMail = (to, templateId, dynamicTemplateData) => {
    sgMail.send({
        to, // receiver email address
        from: {
            name: 'Notification App',
            email: process.env.SENDGRID_FROM,
        },
        templateId,
        dynamicTemplateData,
        asm: {
            groupId: 25075,
            groupsToDisplay: [25075],
        },
    });
};

module.exports = {
    sendMail,
};
