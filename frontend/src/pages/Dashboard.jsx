import { useEffect, useState } from "react";
import axios from "../api/axios";

import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    const res = await axios.get("/dashboard/summary");
    setSummary(res.data);
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return (
    <>
      <Navbar />

      <div className="dashboard">
        <div className="card">
          <h2>Total Tasks</h2>
          <p>{summary?.totalTasks ?? "-"}</p>
        </div>

        <div className="card">
          <h2>Completed</h2>
          <p>{summary?.completedTasks ?? "-"}</p>
        </div>

        <div className="card">
          <h2>Pending</h2>
          <p>{summary?.pendingTasks ?? "-"}</p>
        </div>

        <div className="card">
          <h2>Teams</h2>
          <p>{summary?.teamsCount ?? "-"}</p>
        </div>

        <div className="card">
          <h2>Team Members</h2>
          <p>{summary?.teamMembersCount ?? "-"}</p>
        </div>
      </div>
    </>
  );
}

