function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateString));
}

export function TaskBoard({ tasks, loading, error, onToggle, onDelete }) {
  return (
    <section className="panel board-panel">
      <div className="panel-heading">
        <div>
          <h2>Release validation board</h2>
          <p>Every card here travels through the same deployment path as code changes.</p>
        </div>
        <span className="status-pill">{loading ? "Refreshing" : "Live data"}</span>
      </div>

      {error ? <div className="error-banner">{error}</div> : null}

      {tasks.length === 0 && !loading ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Create one on the left to validate the full application path.</p>
        </div>
      ) : null}

      <div className="card-grid">
        {tasks.map((task) => (
          <article className="task-card" key={task._id}>
            <div className="task-topline">
              <span className={task.completed ? "task-chip task-chip-done" : "task-chip"}>
                {task.completed ? "Completed" : "Open"}
              </span>
              <button className="icon-button" onClick={() => onDelete(task._id)} type="button">
                Remove
              </button>
            </div>

            <h3>{task.title}</h3>
            <p>{task.description || "No description provided for this validation task."}</p>

            <div className="task-footer">
              <span>{formatDate(task.createdAt)}</span>
              <button
                className="secondary-button"
                onClick={() => onToggle(task)}
                type="button"
              >
                Mark {task.completed ? "Open" : "Done"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
