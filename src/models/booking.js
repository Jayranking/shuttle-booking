const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    full_name: {
    type: String,
    required: true
  },

  phone_no: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  destination: {
    type: String,
    required: true,
  },
});

const Booking = mongoose.model("booking", bookingSchema);
module.exports = Booking;