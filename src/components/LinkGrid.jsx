import LinkCard from "./LinkCard";

export default function LinkGrid({ links, loading, onTagClick }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden animate-stagger"
            style={{
              animationDelay: `${i * 80}ms`,
              borderRadius: "var(--radius-lg)",
              backgroundColor: "var(--color-bg-elevated)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <div className="skeleton" style={{ aspectRatio: "16/9" }} />
            <div className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <div
                  className="w-4 h-4 rounded skeleton flex-shrink-0"
                />
                <div className="flex-1 space-y-2">
                  <div className="h-4 skeleton rounded" style={{ width: "75%", borderRadius: "var(--radius-sm)" }} />
                  <div className="h-3 skeleton rounded" style={{ width: "45%", borderRadius: "var(--radius-sm)" }} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="h-3 skeleton rounded" style={{ width: "100%", borderRadius: "var(--radius-sm)" }} />
                <div className="h-3 skeleton rounded" style={{ width: "60%", borderRadius: "var(--radius-sm)" }} />
              </div>
              <div className="flex gap-1.5">
                <div className="h-5 w-14 skeleton" style={{ borderRadius: "var(--radius-sm)" }} />
                <div className="h-5 w-16 skeleton" style={{ borderRadius: "var(--radius-sm)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {links.map((link, i) => (
        <LinkCard key={link.id} link={link} onTagClick={onTagClick} index={i} />
      ))}
    </div>
  );
}
