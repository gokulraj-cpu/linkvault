const CATEGORY_COLORS = {
  engineering: "#4a9eff",
  design: "#e879a0",
  product: "#a78bfa",
  marketing: "#f59e0b",
  documentation: "#34d399",
  "tools-resources": "#6366f1",
  "articles-blogs": "#ef4444",
  "videos-tutorials": "#14b8a6",
  research: "#c084fc",
  other: "#94a3b8",
};

export default function CategoryFilter({
  categories,
  channels,
  activeCategory,
  activeChannel,
  onCategoryChange,
  onChannelChange,
}) {
  return (
    <div className="space-y-5">
      <div className="flex justify-center">
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar py-1 px-1">
          <Pill
            active={!activeCategory && !activeChannel}
            onClick={() => { onCategoryChange(""); onChannelChange(""); }}
          >
            all
          </Pill>
          {categories.filter(c => c.link_count > 0).map((cat) => (
            <Pill
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() => onCategoryChange(activeCategory === cat.id ? "" : cat.id)}
              dotColor={CATEGORY_COLORS[cat.slug] || "#94a3b8"}
            >
              {cat.name.toLowerCase()}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pill({ children, active, onClick, dotColor }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs whitespace-nowrap transition-all duration-200 flex-shrink-0"
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: active ? 500 : 400,
        borderRadius: "var(--radius-pill)",
        backgroundColor: active ? "var(--color-text)" : "var(--color-surface)",
        color: active ? "var(--color-bg)" : "var(--color-text-secondary)",
        border: `1px solid ${active ? "var(--color-text)" : "var(--color-border)"}`,
      }}
    >
      {dotColor && !active && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </button>
  );
}
