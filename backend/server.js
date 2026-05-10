// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// const candidateRoutes = require("./routes/candidateRoutes");
// const matchRoutes = require("./routes/matchRoutes");
// const aiRoutes = require("./routes/aiRoutes");

// app.use("/api/candidates", candidateRoutes);
// app.use("/api", matchRoutes);
// app.use("/api/ai", aiRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));

// const PORT = 8000;

// app.get("/api/test-ai", async (req, res) => {
//   res.json({ ok: "backend working" });
// });

// app.get("/", (req, res) => {
//   res.send("Backend Working");
// });

// app.get("/ping", (req, res) => {
//   console.log("PING HIT");
//   res.json({ message: "backend working" });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

/* ---------------- MIDDLEWARE ---------------- */
app.use(
  cors({
    origin: "http://localhost:3000", // React frontend
    credentials: true,
  }),
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
