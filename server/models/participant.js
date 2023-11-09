const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParticipantSchema = new Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  nickName: {
    type: String,
    default: "",
  },
  phoneNumber: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "S",
  },
  organization: {
    type: String,
    default: "",
  },
  speakingTopic: {
    type: String,
    default: "",
  },
  isHalal: {
    type: Boolean,
    default: false,
  },
  pdpa: {
    type: Boolean,
    default: false,
  },
  allergic: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    default: "PENDING",
  },
  slip: {
    type: String,
    default: "",
  },
});

//NOT_QUALIFIED(-1), PENDING(0), QUALIFIED(1), CONFIRMED(2)

const Paticipant = mongoose.model("Paticipant", ParticipantSchema);
module.exports = Paticipant;
