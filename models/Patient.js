const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  name: {
    first: String,
    last: String,
  },
  age: Number,
  condition: String,
  medicalHistory: [
    {
      treatment: String,
      date: Date,
      doctor: String,
    },
  ],
  medications: [
    {
      name: String,
      dosage: String,
      startDate: Date,
      endDate: Date,
    },
  ],
  labResults: [
    {
      testName: String,
      result: String,
      date: Date,
    },
  ],
});

module.exports = mongoose.model("Patient", PatientSchema);
