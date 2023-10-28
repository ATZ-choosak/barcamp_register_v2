const router = require("express").Router();
const registerController = require('../controllers/registerController')

//middleWare
const session = require('../middleware/sessionMiddleWare')

router.put("/register", session, registerController)

module.exports = router