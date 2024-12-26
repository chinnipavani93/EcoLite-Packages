const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cron = require("node-cron");
const mongoose = require("mongoose");
const { sendWelcomeEmail } = require("./EmailService/WelcomeEmail");
const { SendParcelPendingEmail } = require("./EmailService/PendingParcel");
const { sendParcelDeliveredEmail } = require("./EmailService/DeliveredParcel");

dotenv.config();
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

//DB CONNECTION
const DB = process.env.DB;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connection is successful");
  })
  .catch((e) => {
    console.log(e);
  });

//TASK SCHEDULER

const run = () => {
  cron.schedule("* * * * *", () => {
    sendWelcomeEmail()
    SendParcelPendingEmail()
    sendParcelDeliveredEmail()
  });
};

run();

//SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`BackgroundServices is running on port ${PORT}`);
});
