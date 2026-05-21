export default function CategoryFilter({
  categories,
  channels,
  activeCategory,
  activeChannel,
  onCategoryChange,
  onChannelChange,
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3
          className="text-xs tracking-widest uppercase mb-4"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-text-tertiary)",
            fontWeight: 500,
            letterSpacing: "0.1em",
          }}
        >
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <Chip
            active={!activeCategory}
            onClick={() => onCategoryChange("")}
          >
            All
          </Chip>
          {categories.map((cat) => (
            <Chip
              key={cat.id}
              active={activeCategory === cat.id}
              onClick={() =>
                onCategoryChange(activeCategory === cat.id ? "" : cat.id)
              }
              icon={cat.icon}
              count={cat.link_count}
            >
              {cat.name}
            </Chip>
          ))}
        </div>
      </div>

      {channels.length > 0 && (
        <div>
          <h3
            className="text-xs tracking-widest uppercase mb-4"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-text-tertiary)",
              fontWeight: 500,
              letterSpacing: "0.1em",
            }}
          >
            Channels
          </h3>
          <div className="flex flex-wrap gap-2">
            <Chip
              active={!activeChannel}
              onClick={() => onChannelChange("")}
            >
              All
            </Chip>
            {channels.map((ch) => (
              <Chip
                key={ch.name}
                active={activeChannel === ch.name}
                onClick={() =>
                  onChannelChange(activeChannel === ch.name ? "" : ch.name)
                }
                prefix="#"
                count={ch.count}
              >
                {ch.name}
              </Chip>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Chip({ children, active, onClick, icon, prefix, count }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs tracking-wide transition-all duration-300"
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: active ? 500 : 400,
        borderRadius: "var(--radius-lg)",
        backgroundColor: active ? "var(--color-text)" : "transparent",
        color: active ? "var(--color-bg)" : "var(--color-text-secondary)",
        border: `1px solid ${active ? "var(--color-text)" : "var(--color-border)"}`,
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "var(--color-hover)";
          e.currentTarget.style.borderColor = "var(--color-text-tertiary)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.borderColor = "var(--color-border)";
        }
      }}
    >
      {icon && <span className="text-xs">{icon}</span>}
      {prefix && (
        <span style={{ color: active ? "var(--color-bg)" : "var(--color-text-tertiary)", opacity: 0.6 }}>
          {prefix}
        </span>
      )}
      <span>{children}</span>
      {count > 0 && (
        <span
          className="text-[10px] ml-0.5"
          style={{ opacity: 0.5 }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
