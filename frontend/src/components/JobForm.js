import React, { useState } from "react";
import axios from "axios";

import MatchResults from "./MatchResults";

const JobForm = () => {
  const [jobData, setJobData] = useState({
    requiredSkills: "",
    minExperience: "",
  });

  const [results, setResults] = useState([]);

  const [aiResult, setAiResult] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJobData({
      ...jobData,
      [e.target.name]: e.target.value,
    });
  };

  // BASIC MATCHING

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      requiredSkills: jobData.requiredSkills.split(",").map((s) => s.trim()),

      minExperience: Number(jobData.minExperience),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/match",
        payload,
      );

      setResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // AI SHORTLISTING

  const handleAIShortlist = async () => {
    const payload = {
      requiredSkills: jobData.requiredSkills.split(",").map((s) => s.trim()),

      minExperience: Number(jobData.minExperience),
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/ai/shortlist",
        payload,
      );

      setAiResult(response.data.result);
    } catch (error) {
      console.log("AI ERROR:", error.response?.data || error.message);

      alert("AI Shortlisting Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Job Requirements</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="requiredSkills"
          placeholder="Required Skills"
          value={jobData.requiredSkills}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="minExperience"
          placeholder="Minimum Experience"
          value={jobData.minExperience}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Match Candidates</button>
      </form>

      <br />

      <button onClick={handleAIShortlist} disabled={loading}>
        {loading
          ? "Generating AI Recommendation..."
          : "AI Shortlist Candidates"}
      </button>

      <MatchResults results={results} />

      {aiResult && (
        <div
          style={{
            marginTop: "20px",
            border: "1px solid black",
            padding: "15px",
          }}
        >
          <h2>AI Recommendation</h2>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              fontFamily: "inherit",
            }}
          >
            {aiResult}
          </pre>
        </div>
      )}
    </div>
  );
};

export default JobForm;
