const Paticipant = require('../models/participant')
const Console = require("../models/console")

module.exports = (req, res) => {

    let email = req.body.email

    Paticipant.findOne({ email: email }).then(async (update_user) => {
        if (update_user) {

            let console_lst = await Console.findOne({ name: "control" })
            if (console_lst.editable) {

                if (update_user.pdpa) {

                    await update_user.updateOne(req.body)

                    res.status(200).send({
                        error: false,
                        data: req.body,
                        message: "Paticipant edited successfully."
                    })
                } else {

                    if (req.body.pdpa) {

                        await update_user.updateOne(req.body)

                        res.status(200).send({
                            error: false,
                            message: "Update PDPA Complete."
                        })
                    } else {
                        res.status(200).send({
                            error: false,
                            message: "PDPA not confirm."
                        })
                    }

                }

            } else {
                res.status(200).send({
                    error: true,
                    message: "Not Time To Edit information."
                })
            }

        } else {
            res.status(200).send({
                error: true,
                message: "No User in database or no request body data."
            })
        }
    }).catch(error => {
        res.send({
            error: true,
            message: error.errors
        })
    })


}