import { useEffect, useState } from "react";
import axios from "../api/axios";

import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: ""
  });

  const fetchSummary = async () => {
    const res = await axios.get("/dashboard/summary");
    setSummary(res.data);
  };

  const fetchTasks = async () => {
    const res = await axios.get("/tasks");
    setTasks(res.data);
  };

  const userToken = localStorage.getItem("token");
  const decoded = userToken ? JSON.parse(atob(userToken.split(".")[1])) : null;
  const role = decoded?.role;

  const canCreate = role === "super_admin" || role === "team_admin";
  const canMarkCompleted = role === "member" || role === "team_admin" || role === "super_admin";


  const createTask = async () => {
    if (!canCreate) return;

    await axios.post("/tasks", {
      ...form,
      status: "pending"
    });

    fetchTasks();

    setForm({
      title: "",
      description: ""
    });
  };

  const updateStatus = async (taskId, nextStatus) => {
    await axios.put(`/tasks/${taskId}`, {
      status: nextStatus
    });

    fetchTasks();
  };

  useEffect(() => {
    fetchSummary();
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="task-page">
        <div className="dashboard">
          <div className="card">
            <h2>Pending</h2>
            <p>{summary?.pendingTasks ?? "-"}</p>
          </div>

          <div className="card">
            <h2>Completed</h2>
            <p>{summary?.completedTasks ?? "-"}</p>
          </div>
        </div>

        <div className="task-form">
          {canCreate ? (
            <>
              <h2>Create Task</h2>

              <input
                placeholder="Task Title"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value
                  })
                }
              />

              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value
                  })
                }
              />

              <button onClick={createTask}>
                Create Task
              </button>
            </>
          ) : (
            <p style={{ color: "#777" }}>
              Your role can’t create tasks.
            </p>
          )}
        </div>

        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              canUpdate={canMarkCompleted}

              onUpdateStatus={updateStatus}
            />
          ))}
        </div>
      </div>
    </>
  );
}

