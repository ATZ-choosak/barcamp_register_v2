const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
const mongoose = require('mongoose')
const app = express();
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL).then(() => console.log("connected to Database."))

app.use(
  cookieSession({
    name: "session",
    keys: ["barcamp8"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);

app.listen(8080, () => {
  console.log("Server is running!");
});
