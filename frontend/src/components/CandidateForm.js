import React, { useState } from "react";
import axios from "axios";

const CandidateForm = ({}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    bio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      skills: formData.skills.split(",").map((s)=> s.trim()),
    };

    try {
      await axios.post("https://candidate-shortlisting-app.onrender.com/api/candidates", payload);

      alert("Candidate Added Successfully");

      // onAdd();

      setFormData({
        name: "",
        email: "",
        skills: "",
        experience: "",
        bio: "",
      });

      if (window.refreshCandidates) {
      window.refreshCandidates();
      }
      
    } catch (error) {
      console.log(error);

      alert("Error adding candidate");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Candidate</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Add Candidate</button>
      </form>
    </div>
  );
};

export default CandidateForm;
