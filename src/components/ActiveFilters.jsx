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
      label: `tag: ${filters.tag}`,
      onRemove: () => onUpdate({ tag: "" }),
    });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-medium text-gray-500">Active filters:</span>
      {activeFilters.map((f) => (
        <span
          key={f.key}
          className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg"
        >
          {f.label}
          <button
            onClick={f.onRemove}
            className="ml-0.5 hover:text-indigo-900 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      ))}
      {activeFilters.length > 1 && (
        <button
          onClick={() =>
            onUpdate({ search: "", category: "", channel: "", tag: "" })
          }
          className="text-xs text-gray-400 hover:text-gray-600 underline transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
