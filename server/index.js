const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const parser = require("body-parser");

//Routes
const authRoute = require("./routes/auth");
const participantRoute = require("./routes/participantRoute");
const getConsoleRoute = require("./routes/getConsole");

mongoose
  .connect(`${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`)
  .then(() => console.log("connected to Database."));

app.use(
  cookieSession({
    name: "session",
    keys: ["barcamp8"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static(__dirname))

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/api", participantRoute);
app.use("/api", getConsoleRoute);

app.listen(process.env.PORT, () => {
  console.log("Server is running!");
});
