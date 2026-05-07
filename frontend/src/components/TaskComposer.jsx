export function TaskComposer({ form, submitting, onChange, onSubmit }) {
  return (
    <section className="panel composer-panel">
      <div className="panel-heading">
        <div>
          <h2>Create a deployment task</h2>
          <p>Use the app itself to prove API routing, storage, and observability are wired correctly.</p>
        </div>
      </div>

      <form className="task-form" onSubmit={onSubmit}>
        <label>
          <span>Title</span>
          <input
            autoComplete="off"
            name="title"
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                title: event.target.value,
              }))
            }
            placeholder="Validate prod overlay sync"
            type="text"
            value={form.title}
          />
        </label>

        <label>
          <span>Description</span>
          <textarea
            name="description"
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                description: event.target.value,
              }))
            }
            placeholder="Example: confirm ArgoCD self-healed the workload after a manual replica drift."
            rows="6"
            value={form.description}
          />
        </label>

        <button className="primary-button" disabled={submitting} type="submit">
          {submitting ? "Publishing task..." : "Create task"}
        </button>
      </form>
    </section>
  );
}
