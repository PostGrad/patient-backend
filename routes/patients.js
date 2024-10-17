const express = require("express");
const Patient = require("../models/Patient");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// @route   GET /api/patients
// @desc    Get all patients
router.get("/", authMiddleware, async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/patients/:id
// @desc    Get a single patient by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
