export default function EmptyState({ hasFilters, onClear }) {
  if (hasFilters) {
    return (
      <div className="text-center py-20 animate-in">
        <p className="text-sm" style={{ color: "var(--color-text-secondary)", fontWeight: 300 }}>
          No links match your filters.
        </p>
        <button
          onClick={onClear}
          className="mt-4 px-4 py-2 text-xs transition-opacity duration-200 hover:opacity-70"
          style={{
            borderRadius: "var(--radius-pill)",
            backgroundColor: "var(--color-text)",
            color: "var(--color-bg)",
            fontWeight: 500,
          }}
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-24 animate-in">
      <h2
        className="text-2xl mb-3"
        style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", color: "var(--color-text)" }}
      >
        Begin curating
      </h2>
      <p
        className="text-sm max-w-sm mx-auto leading-relaxed"
        style={{ color: "var(--color-text-secondary)", fontWeight: 300 }}
      >
        Mention{" "}
        <span
          className="px-1.5 py-0.5 text-xs"
          style={{
            borderRadius: "4px",
            backgroundColor: "var(--color-surface-alt)",
            fontWeight: 500,
            color: "var(--color-text)",
          }}
        >
          @save
        </span>{" "}
        with any link in Slack and it will appear here, categorized automatically.
      </p>
    </div>
  );
}
