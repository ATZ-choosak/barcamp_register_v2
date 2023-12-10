const router = require("express").Router();
const jwt = require("jsonwebtoken");
const jwtValidate = require("../middleware/jwtValidate");
require("dotenv").config();

const Participant = require("../models/participant");

const jwtGenerate = (user) => {
  const accessToken = jwt.sign(
    { name: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d", algorithm: "HS256" }
  );

  return accessToken;
};

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const access_token = jwtGenerate({ username });
    res.json({ access_token });
  } else {
    res.status(200).json({
      error: true,
      message: "No Admin",
    });
  }
});

router.get("/admin/all_users", jwtValidate, (req, res) => {
  Participant.find({}).then((data) => res.json(data));
});

router.post("/admin/update_status", jwtValidate, (req, res) => {
  const { _id, status } = req.body;
  Participant.findByIdAndUpdate(_id, { status })
    .then((data) => res.json(data))
    .catch(() => res.json({ message: "No User ID." }));
});

module.exports = router;
