// const ejs = require("ejs");
// const dotenv = require("dotenv");
// const sendMail = require("../helpers/sendmail");
// const User = require("../models/User");
// const CryptoJs = require("crypto-js");

// dotenv.config();

// const sendWelcomeEmail = async () => {
//   const users = await User.find({ status: 0 });
//   if (users.length > 0) {
//     for (let user of users) {
//       try {
//         if (!user.password) {
//           console.error(`Password is missing for user: ${user.email}`);
//           continue;
//         }
//       const hashedpassword = CryptoJs.AES.decrypt(
//         user.password,
//         process.env.PASS
//       );
//       let originalPassword = hashedpassword.toString(CryptoJs.enc.Utf8);
      
//     //   if (!originalPassword) {
//     //     throw new Error('Decryption failed: Invalid password or key');
//     //   }
//      } 
//     // catch (error) {
//     //   console.error(`Error decrypting password for user ${user.email}:`, error.message);
//     //   continue;
//     // }

//       ejs.renderFile(
//         "templates/welcome.ejs",
//         {
//           fullname: user.fullname,
//           password: originalPassword,
//           email: user.email,
//         },
//         async (err, info) => {
//           let messageOption = {
//             from: process.env.EMAIL,
//             to: user.email,
//             subject: "Welcome to EcoLite",
//             html: info,
//           };
//           try {
//             sendMail(messageOption);
//             await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
//           } catch (error) {
//             console.log(error);
//           }
//         }
//       );
//       }
//       catch (error) {
//         console.error(`Error processing user ${user.email}:`, error.message);
//     }
//   }
//   catch (error) {
//     console.error("Error retrieving users:", error.message);
//   }
// };

// module.exports = { sendWelcomeEmail };

// const ejs = require("ejs");
// const dotenv = require("dotenv");
// const sendMail = require("../helpers/sendmail");
// const User = require("../models/User");
// const CryptoJs = require("crypto-js");

// dotenv.config();

// const sendWelcomeEmail = async () => {
//   try {
//     const users = await User.find({ status: 0 });
//     if (users.length > 0) {
//       for (let user of users) {
//         try {
//           if (!user.password) {
//             console.error(`Password is missing for user: ${user.email}`);
//             continue;
//           }

//           const hashedpassword = CryptoJs.AES.decrypt(
//             user.password,
//             process.env.PASS
//           );
//           const originalPassword = hashedpassword.toString(CryptoJs.enc.Utf8);

//           if (!originalPassword) {
//             throw new Error("Decryption failed: Invalid password or key");
//           }

//           ejs.renderFile(
//             "templates/welcome.ejs",
//             {
//               fullname: user.fullname,
//               password: originalPassword,
//               email: user.email,
//             },
//             async (err, info) => {
//               if (err) {
//                 console.error(
//                   `Error rendering email template for user ${user.email}:`,
//                   err.message
//                 );
//                 return;
//               }

//               const messageOption = {
//                 from: process.env.EMAIL,
//                 to: user.email,
//                 subject: "Welcome to EcoLite",
//                 html: info,
//               };

//               try {
//                 await sendMail(messageOption);
//                 await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
//               } catch (error) {
//                 console.error(
//                   `Error sending email or updating status for user ${user.email}:`,
//                   error.message
//                 );
//               }
//             }
//           );
//         } catch (error) {
//           console.error(`Error processing user ${user.email}:`, error.message);
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error retrieving users:", error.message);
//   }
// };

// module.exports = { sendWelcomeEmail };


const ejs = require("ejs");
const dotenv = require("dotenv");
const sendMail = require("../helpers/sendmail");
const User = require("../models/User");

dotenv.config();

const sendWelcomeEmail = async () => {
  const users = await User.find({ status: 0 });
  
  if (users.length > 0) {
    for (let user of users) {
      try {
        if (!user.password) {
          console.error(`Password is missing for user: ${user.email}`);
          continue;
        }

        // Use the plain-text password directly
        const originalPassword = user.password;

        console.log(`Sending welcome email to ${user.email}`);

        // Render the email template
        ejs.renderFile(
          "templates/welcome.ejs",
          {
            fullname: user.fullname,
            password: originalPassword,
            email: user.email,
          },
          async (err, info) => {
            if (err) {
              console.error(`Error rendering EJS template for user ${user.email}:`, err.message);
              return;
            }

            let messageOption = {
              from: process.env.EMAIL,
              to: user.email,
              subject: "Welcome to EcoLite",
              html: info,
            };

            try {
              await sendMail(messageOption);
              console.log(`Email sent successfully to ${user.email}`);
              await User.findByIdAndUpdate(user._id, { $set: { status: 1 } });
            } catch (error) {
              console.error(`Error sending email to ${user.email}:`, error.message);
            }
          }
        );
      } catch (error) {
        console.error(`Error processing user ${user.email}:`, error.message);
      }
    }
  } else {
    console.log("No users found with status 0.");
  }
};

module.exports = { sendWelcomeEmail };