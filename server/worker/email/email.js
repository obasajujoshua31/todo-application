import sgMail from "@sendgrid/mail";
import verificationEmail from "./templates/verification";

const isTest = process.env.NODE_ENV === test;

const { SENDGRID_API_KEY, EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = (email, url) => {
  const msg = {
    to: email,
    from: EMAIL,
    subject: "Welcome to Todo Application",
    html: verificationEmail(url)
  };
  return isTest ? Promise.resolve("Email Sent") : sgMail.send(msg);
};

export default sendEmail;
