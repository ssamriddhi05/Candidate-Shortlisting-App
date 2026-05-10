const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://candidate-shortlisting-ju2zk6syu-ssamriddhi05s-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

/* ---------------- ROUTES ---------------- */
const candidateRoutes = require("./routes/candidateRoutes");
const matchRoutes = require("./routes/matchRoutes");
const aiRoutes = require("./routes/aiRoutes");

app.use("/api/candidates", candidateRoutes);
app.use("/api/match", matchRoutes); // ✅ FIXED (better clarity)
app.use("/api/ai", aiRoutes);

/* ---------------- MONGO DB ---------------- */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

/* ---------------- TEST ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("Backend Working");
});

app.get("/api/test-ai", (req, res) => {
  res.json({ ok: "backend working" });
});

/* ---------------- START SERVER ---------------- */
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
