const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../config/config");

const sendEmail = async (mailOptions) => {
  const oAuth2Client = new google.auth.OAuth2(
    config.GOOGLE_CLIENT_ID,
    config.GOOGLE_CLIENT_SECRET,
    config.MAIL_REDIRECT_URI
  );
  oAuth2Client.setCredentials({
    refresh_token: config.MAIL_REFRESH_TOKEN,
  });
  const accessToken = await oAuth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: config.MAIL_SERVICE,
    host: config.MAIL_HOST,
    port: config.MAIL_PORT,
    secure: true,
    debug:true,
    auth: {
      type: "OAuth2",
      user: config.EMAIL,
      clientId: config.GOOGLE_CLIENT_ID ,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      refreshToken: config.MAIL_REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  await transporter.sendMail(mailOptions);
  return true;
};


module.exports={
    sendEmail
}