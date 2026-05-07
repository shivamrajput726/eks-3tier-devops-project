export function TaskInsights({ totalTasks, openTasks, completedTasks, loading }) {
  const cards = [
    {
      label: "Tasks tracked",
      value: loading ? "..." : totalTasks,
    },
    {
      label: "Open work",
      value: loading ? "..." : openTasks,
    },
    {
      label: "Completed",
      value: loading ? "..." : completedTasks,
    },
  ];

  return (
    <section className="stats-panel">
      {cards.map((card) => (
        <div className="stat-card" key={card.label}>
          <span>{card.label}</span>
          <strong>{card.value}</strong>
        </div>
      ))}
    </section>
  );
}
