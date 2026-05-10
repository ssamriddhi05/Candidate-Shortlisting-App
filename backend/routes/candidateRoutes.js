const express = require("express");
const router = express.Router();

const {
  addCandidate,
  getCandidates,
  deleteCandidate,
  updateCandidate,
} = require("../controllers/candidateController");

router.post("/", addCandidate);
router.get("/", getCandidates);
router.put("/:id", updateCandidate);
router.delete("/:id", deleteCandidate);

module.exports = router;
