export default function ActiveFilters({ filters, categories, onUpdate }) {
  const active = [];

  if (filters.search) active.push({ key: "search", label: `"${filters.search}"`, onRemove: () => onUpdate({ search: "" }) });
  if (filters.category) {
    const cat = categories.find((c) => c.id === filters.category);
    active.push({ key: "category", label: cat?.name?.toLowerCase() || "category", onRemove: () => onUpdate({ category: "" }) });
  }
  if (filters.channel) active.push({ key: "channel", label: `#${filters.channel}`, onRemove: () => onUpdate({ channel: "" }) });
  if (filters.tag) active.push({ key: "tag", label: filters.tag, onRemove: () => onUpdate({ tag: "" }) });

  if (active.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap animate-in">
      {active.map((f) => (
        <span
          key={f.key}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"
          style={{
            borderRadius: "var(--radius-pill)",
            backgroundColor: "var(--color-surface-alt)",
            color: "var(--color-text-secondary)",
          }}
        >
          {f.label}
          <button onClick={f.onRemove} className="hover:opacity-60 transition-opacity">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
    </div>
  );
}
