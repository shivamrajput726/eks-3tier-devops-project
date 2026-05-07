import { useEffect, useState } from "react";

import { TaskBoard } from "./components/TaskBoard";
import { TaskComposer } from "./components/TaskComposer";
import { TaskInsights } from "./components/TaskInsights";
import { createTask, deleteTask, getTasks, updateTask } from "./lib/api";

const initialFormState = {
  title: "",
  description: "",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    void refreshTasks();
  }, []);

  async function refreshTasks() {
    try {
      setLoading(true);
      setError("");
      setTasks(await getTasks());
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateTask(event) {
    event.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      await createTask(form);
      setForm(initialFormState);
      await refreshTasks();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleTask(task) {
    try {
      setError("");
      await updateTask(task._id, {
        completed: !task.completed,
      });
      await refreshTasks();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      setError("");
      await deleteTask(id);
      await refreshTasks();
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  const completedTasks = tasks.filter((task) => task.completed).length;
  const openTasks = tasks.length - completedTasks;

  return (
    <div className="shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">AWS EKS | ArgoCD | Terraform | GitHub Actions</span>
          <h1>Production-grade delivery, visible in one working workload.</h1>
          <p>
            This task system is the live sample application for the full 3-tier
            GitOps platform. It exercises the frontend, backend, MongoDB, ingress,
            autoscaling, and observability path end to end.
          </p>
        </div>

        <TaskInsights
          totalTasks={tasks.length}
          openTasks={openTasks}
          completedTasks={completedTasks}
          loading={loading}
        />
      </header>

      <main className="layout">
        <TaskComposer
          form={form}
          submitting={submitting}
          onChange={setForm}
          onSubmit={handleCreateTask}
        />

        <TaskBoard
          tasks={tasks}
          loading={loading}
          error={error}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
        />
      </main>
    </div>
  );
}

export default App;
