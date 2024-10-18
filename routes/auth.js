const express = require("express");
const jwt = require("jsonwebtoken");
const Provider = require("../models/Provider");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
// @route   POST /api/auth/register
// @desc    Register a new provider
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingProvider = await Provider.findOne({ email });
    if (existingProvider) {
      return res.status(400).json({ error: "Provider already exists" });
    }

    const newProvider = new Provider({ name, email, password });
    await newProvider.save();

    res.status(201).json({ message: "Provider registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   POST /api/auth/login
// @desc    Login and get a JWT token
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const provider = await Provider.findOne({ email });
    if (!provider) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await provider.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const payload = {
      id: provider._id,
      name: provider.name,
      email: provider.email,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    // console.log("generated token after login => ", token);
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
