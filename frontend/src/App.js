import React from "react";

import CandidateForm from "./components/CandidateForm";
import CandidateList from "./components/CandidateList";
import JobForm from "./components/JobForm";

function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Candidate Shortlisting App</h1>

      <CandidateForm />

      <CandidateList />

      <JobForm />
    </div>
  );
}

export default App;
