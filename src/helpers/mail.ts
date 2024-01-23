import sgMail, { MailDataRequired } from "@sendgrid/mail";
import config from "../config/config";
sgMail.setApiKey(config.SENDGRID_API_KEY);

export const sendEmail = (mailOptions: MailDataRequired) => {
  return sgMail.send(mailOptions);
};
