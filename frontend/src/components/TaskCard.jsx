export default function TaskCard({
  task,
  canUpdate,
  onUpdateStatus
}) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span className="status">
          {task.status}
        </span>

        {canUpdate ? (
          <select
            value={task.status}
            onChange={(e) =>
              onUpdateStatus(task._id, e.target.value)
            }
          >
            <option value="pending">pending</option>
            <option value="in-progress">in-progress</option>
            <option value="completed">completed</option>
          </select>
        ) : null}
      </div>
    </div>
  );
}

