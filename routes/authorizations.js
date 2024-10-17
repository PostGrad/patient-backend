const express = require("express");
const Authorization = require("../models/Authorization");
const Patient = require("../models/Patient");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// @route   POST /api/authorizations
// @desc    Submit a prior authorization request
router.post("/", authMiddleware, async (req, res) => {
  const {
    patientId,
    treatmentType,
    insurancePlan,
    dateOfService,
    diagnosisCode,
    doctorNotes,
  } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const newAuthorization = new Authorization({
      patientId,
      treatmentType,
      insurancePlan,
      dateOfService,
      diagnosisCode,
      doctorNotes,
    });

    const savedAuthorization = await newAuthorization.save();
    res.status(201).json(savedAuthorization);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
