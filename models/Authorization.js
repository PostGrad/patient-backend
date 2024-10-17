const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorizationSchema = new Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  treatmentType: { type: String, required: true },
  insurancePlan: { type: String, required: true },
  dateOfService: { type: Date, required: true },
  diagnosisCode: { type: String, required: true },
  doctorNotes: String,
  status: {
    type: String,
    default: "pending", // could be 'pending', 'approved', 'denied'
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Authorization", AuthorizationSchema);
