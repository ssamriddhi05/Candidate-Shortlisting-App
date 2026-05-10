import React, { useEffect, useState } from "react";
import axios from "axios";

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("https://candidate-shortlisting-app.onrender.com/api/candidates/");

      setCandidates(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://candidate-shortlisting-app.onrender.com/api/candidates/${id}`);

      fetchCandidates();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (candidate) => {
    const updatedName = prompt("Enter new name", candidate.name);

    if (!updatedName) return;

    try {
      await axios.put(`https://candidate-shortlisting-app.onrender.com/api/candidates/${candidate._id}`, {
        ...candidate,
        name: updatedName,
      });

      fetchCandidates();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Candidate List</h2>

      {candidates.map((candidate) => (
        <div
          key={candidate._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{candidate.name}</h3>

          <p>Email: {candidate.email}</p>

          <p>Skills: {candidate.skills.join(", ")}</p>

          <p>Experience: {candidate.experience} years</p>

          <p>{candidate.bio}</p>

          <button onClick={() => handleEdit(candidate)}>Edit</button>

          <button onClick={() => handleDelete(candidate._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
