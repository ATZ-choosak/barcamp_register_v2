const router = require("express").Router();
const registerController = require("../controllers/registerController");
const slipController = require("../controllers/slipController");

//middleWare
const session = require("../middleware/sessionMiddleWare");
const upload = require("../upload");

router.put("/register", session, registerController);
router.post("/slip", session, upload.single("slip"), slipController);

module.exports = router;
