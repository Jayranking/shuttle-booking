const mongoose = require("mongoose");

const vehicleSchema = mongoose.Schema({
  vehicle_model: {
    type: String,
    required: true
  },

  plate_no: {
    type: String,
    required: true,
    unique: true
  },

  img: {
    type: String,
    required: true,
  },

  amount: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Vehicle = mongoose.model("vehicle", vehicleSchema);
module.exports = Vehicle;