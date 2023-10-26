const Paticipant = require('../models/participant')

module.exports = (req, res) => {
    Paticipant.create(req.body).then((data) => {
        res.status(200).send({
            error: false,
            data,
            message: "Paticipant registed successfully."
        })
    }).catch((error) => {
        res.send({
            error: true,
            message: error.errors
        })
    })
}