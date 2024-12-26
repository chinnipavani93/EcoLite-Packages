// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();

// function createTransporter(config) {
//   const transporter = nodemailer.createTransport(config);
//   return transporter;
// }

// let configurations = {
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   requireTLS: true,
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// };

// const sendMail = async (messageoption) => {
//   const transporter = await createTransporter(configurations);
//   await transporter.verify();
//   await transporter.sendMail(messageoption, (err, info) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(info.response);
//   });
// };

// module.exports = sendMail;

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const sendMail = async (messageOption) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail(messageOption);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};

module.exports = sendMail;
