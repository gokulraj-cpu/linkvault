export default function ActiveFilters({ filters, categories, onUpdate }) {
  const activeFilters = [];

  if (filters.search) {
    activeFilters.push({
      key: "search",
      label: `"${filters.search}"`,
      onRemove: () => onUpdate({ search: "" }),
    });
  }

  if (filters.category) {
    const cat = categories.find((c) => c.id === filters.category);
    activeFilters.push({
      key: "category",
      label: cat ? `${cat.icon} ${cat.name}` : "Category",
      onRemove: () => onUpdate({ category: "" }),
    });
  }

  if (filters.channel) {
    activeFilters.push({
      key: "channel",
      label: `#${filters.channel}`,
      onRemove: () => onUpdate({ channel: "" }),
    });
  }

  if (filters.tag) {
    activeFilters.push({
      key: "tag",
      label: filters.tag,
      onRemove: () => onUpdate({ tag: "" }),
    });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex items-center gap-2.5 flex-wrap animate-fade-in">
      <span
        className="text-[11px] tracking-widest uppercase"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 500,
          color: "var(--color-text-tertiary)",
        }}
      >
        Filtered by
      </span>
      {activeFilters.map((f) => (
        <span
          key={f.key}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-all duration-200"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            borderRadius: "var(--radius-md)",
            backgroundColor: "var(--color-accent-bg)",
            color: "var(--color-accent)",
          }}
        >
          {f.label}
          <button
            onClick={f.onRemove}
            className="ml-0.5 transition-opacity duration-200 hover:opacity-60"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
      {activeFilters.length > 1 && (
        <button
          onClick={() => onUpdate({ search: "", category: "", channel: "", tag: "" })}
          className="text-xs underline underline-offset-2 transition-opacity duration-200 hover:opacity-60"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            color: "var(--color-text-tertiary)",
          }}
        >
          Clear all
        </button>
      )}
    </div>
  );
}
