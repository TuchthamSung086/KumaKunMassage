const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "domingo.ward@ethereal.email",
    pass: "2n6SA1pwaXmkX4bP8u",
  },
});

module.exports = transporter;
