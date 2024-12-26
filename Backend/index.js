const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const parcelRoute = require("./routes/parcel")

dotenv.config();
const app = express();

//MIDDLEWARES
//app.use(cors());
//const cors = require("cors");
const allowedOrigins = [
    'https://frontend-4xrayjtou-chinni-pavanis-projects.vercel.app',
    'https://eco-lite-packages.vercel.app',
    'http://localhost:5173', // Add local development URL
  ];
app.use(
  cors({
    origin: function (origin, callback){
      //"https://frontend-4xrayjtou-chinni-pavanis-projects.vercel.app/", // Your frontend link
      if (allowedOrigins.indexOf(origin) !== -1 || !origin){
        callback(null, true); } else { callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // If using cookies or authentication headers
  })
);

app.use(express.json());

//ROUTES

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/users",userRoute)
app.use("/api/v1/parcels",parcelRoute)

//DATABASE CONNECTION
const DB=process.env.DB;
mongoose.connect(DB).then(()=>{
    console.log("DB connection is successful");
}).catch((err)=>{
    console.log(err)
})

//SERVER

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})