require('dotenv').config()

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const Participant = require("./models/participant");
const Console = require("./models/console")

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        async function (accessToken, refreshToken, data, done) {

            let email = data.emails[0].value

            Participant.findOne({ email }).then(async (currentUser) => {

                let console_lst = await Console.findOne({ name: "control" })

                if (currentUser) {
                    done(null, { user: currentUser, editable: console_lst.editable });
                } else {
                    Participant.create({ email }).then(newUser => {
                        done(null, { user: newUser, editable: console_lst.editable });
                    })
                }

            })
        }
    )
);

passport.serializeUser((user, done) => {

    done(null, user.user.email);
});

passport.deserializeUser((email, done) => {

    Participant.findOne({ email }).then(async (currentUser) => {

        let console_lst = await Console.findOne({ name: "control" })

        done(null, { user: currentUser, editable: console_lst.editable });

    })
});