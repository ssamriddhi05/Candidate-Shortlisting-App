import React from "react";

const MatchResults = ({ results }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Shortlisted Candidates</h2>

      {results.map((candidate) => (
        <div
          key={candidate._id}
          style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{candidate.name}</h3>

          <p>Match Score: {candidate.matchScore}%</p>

          <p>Matched Skills: {candidate.matchedSkills.join(", ")}</p>

          <p>Experience: {candidate.experience} years</p>
        </div>
      ))}
    </div>
  );
};

export default MatchResults;
