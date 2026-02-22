interface EmptyStateProps {
  type: "active" | "completed";
}

export function EmptyState({ type }: EmptyStateProps) {
  const config = {
    active: {
      emoji: "🎯",
      message: "No active tasks. Add one to get started!",
    },
    completed: {
      emoji: "✨",
      message: "No completed tasks yet.",
    },
  };

  const { emoji, message } = config[type];

  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">{emoji}</div>
      <p className="text-[#9CA3AF]" style={{ fontFamily: "Inter, sans-serif" }}>
        {message}
      </p>
    </div>
  );
}
