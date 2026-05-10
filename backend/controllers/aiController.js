const axios = require("axios");
const Candidate = require("../models/Candidate");

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
      `${c.name} - Skills: ${c.skills.join(", ")} - Experience: ${c.experience} years - Bio: ${c.bio}`,
  )
  .join("\n")}

Rank candidates and explain why they are suitable.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",

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

    res.json({
      result: response.data.choices[0].message.content,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
};
