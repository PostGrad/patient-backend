const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
let dotenv = require("dotenv").config();
const patientRoutes = require("./routes/patients");
const authorizationRoutes = require("./routes/authorizations");
const authRoutes = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI, { dbName: "patient-dashboard" })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/patients", patientRoutes);
app.use("/api/authorizations", authorizationRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
