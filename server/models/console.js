const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConsoleSchema = new Schema({
    editable: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        default: "control"
    }
})

const Console = mongoose.model('console', ConsoleSchema)
module.exports = Console