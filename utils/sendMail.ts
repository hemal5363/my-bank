const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // Using Gmail as the service
  auth: {
    user: process.env.GMAIL_ACCOUNT, // Your Gmail address
    pass: process.env.GMAIL_PASSWORD, // Your Gmail password or an app-specific password (if 2FA is enabled)
  },
  tls: {
    rejectUnauthorized: false, // Allow the connection even with invalid certificates
  }
});

export default transporter;
