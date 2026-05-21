export default function EmptyState({ hasFilters, onClear }) {
  if (hasFilters) {
    return (
      <div className="text-center py-24 animate-fade-in">
        <p
          className="text-sm mb-6"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            color: "var(--color-text-secondary)",
          }}
        >
          No links match your current filters.
        </p>
        <button
          onClick={onClear}
          className="inline-flex items-center px-5 py-2.5 text-xs tracking-wide transition-all duration-300"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            borderRadius: "var(--radius-lg)",
            backgroundColor: "var(--color-text)",
            color: "var(--color-bg)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-28 animate-fade-in">
      <div className="max-w-md mx-auto space-y-8">
        <div>
          <h2
            className="text-3xl mb-4"
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-text)",
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            Begin curating
          </h2>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
            }}
          >
            Mention{" "}
            <span
              className="inline-flex items-center px-1.5 py-0.5 text-xs"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                borderRadius: "var(--radius-sm)",
                backgroundColor: "var(--color-accent-bg)",
                color: "var(--color-accent)",
              }}
            >
              @save
            </span>{" "}
            with any link in a Slack channel. It will be automatically categorized
            and added to your team's collection.
          </p>
        </div>

        <div
          className="p-5 text-left"
          style={{
            borderRadius: "var(--radius-lg)",
            backgroundColor: "var(--color-bg-subtle)",
            border: "1px solid var(--color-border-subtle)",
          }}
        >
          <p
            className="text-[11px] uppercase tracking-widest mb-3"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              color: "var(--color-text-tertiary)",
            }}
          >
            Example
          </p>
          <div
            className="p-3.5"
            style={{
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <p className="text-sm" style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}>
              <span style={{ color: "var(--color-accent)", fontWeight: 500 }}>@save</span>{" "}
              <span style={{ color: "var(--color-text-secondary)", textDecoration: "underline", textUnderlineOffset: "2px" }}>
                https://example.com/great-article
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
