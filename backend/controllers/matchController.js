const Candidate = require("../models/Candidate");
const matchCandidates = require("../services/matchService");
const axios = require("axios");

exports.shortlistCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    const result = matchCandidates(candidates, req.body);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.aiShortlist = async (req, res) => {
  try {
    const candidates = await Candidate.find();

    const prompt = `
Job Requirements:
Skills: ${req.body.requiredSkills.join(", ")}
Minimum Experience: ${req.body.minExperience}

Candidates:
${candidates
  .map(
    (c) =>
      `${c.name} - Skills: ${c.skills.join(", ")} - Experience: ${c.experience} years`,
  )
  .join("\n")}

Rank candidates and explain why.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-5.2",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
