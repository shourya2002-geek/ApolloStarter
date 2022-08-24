const nodemailer = require('nodemailer');
const { isProduction } = require('../../utils/envUtils');

const getEmailer = async () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

const logTestEmailLink = sentEmail => {
  if (!isProduction()) {
    console.log(`Message sent: ${sentEmail.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(sentEmail)}`);
  }
};

const emailOptions = {
  from: 'info@sicerts.com'
};

const emailHtml = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <p>${text}</p>
  </div>
`;

const sendEmail = async emailObject => {
  const emailer = await getEmailer();
  const sentEmail = await emailer.sendMail(emailObject);
  // Log email links to console for testing
  // logTestEmailLink(sentEmail);
  return sentEmail;
};

module.exports = { sendEmail, emailOptions, emailHtml };