require("dotenv").config();

const router = require("express").Router();
const passport = require("passport");
const Participant = require("../models/participant");
const Console = require("../models/console")


const CLIENT_URL = process.env.PRODUCTION ? process.env.ORIGIN_URL : "http://localhost:3000";

router.get("/login/success", (req, res) => {
    if (req.user) {

        let email = req.user.emails[0].value

        Participant.findOne({ email }).then(async (currentUser) => {

            let console_lst = await Console.findOne({ name: "control" })
            let editable = new Date(console_lst.end_register).getTime() - new Date().getTime() > 0
            

            if (currentUser) {

                res.status(200).json({
                    error: false,
                    message: "successfull",
                    infomation: req.user,
                    user: currentUser,
                    editable
                    //   cookies: req.cookies
                });
            } else {
                Participant.create({ email }).then(newUser => {

                    res.status(200).json({
                        error: false,
                        message: "successfull",
                        infomation: req.user,
                        user: newUser,
                        editable
                        //   cookies: req.cookies
                    });
                })
            }

        })


    } else {
        res.status(200).json({
            error: false,
            message: "No session.",
            //   cookies: req.cookies
        });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (req, res) => {
    req.logOut();
    res.status(200).clearCookie('connect.sid', {
        path: '/'
    });

    res.redirect(CLIENT_URL);

});

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/auth/login/failed",
    })
);

module.exports = router;
