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

// import React, { useState } from "react";
// import CandidateForm from "./CandidateForm";
// import CandidateList from "./CandidateList";

// function App() {
//   const [refresh, setRefresh] = useState(false);

//   const triggerRefresh = () => {
//     setRefresh(!refresh);
//   };

//   return (
//     <div>
//       <CandidateForm onAdd={triggerRefresh} />
//       <CandidateList refresh={refresh} />
//     </div>
//   );
// }

// export default App;
