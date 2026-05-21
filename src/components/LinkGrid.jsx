import LinkCard from "./LinkCard";

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

function formatGroupDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "added today";
  if (diffDays === 1) return "added 1d ago";
  if (diffDays < 30) return `added ${diffDays}d ago`;
  if (diffDays < 365) return `added ${Math.floor(diffDays / 30)}mo ago`;
  return `added ${Math.floor(diffDays / 365)}y ago`;
}

function groupByDate(links) {
  const groups = {};
  for (const link of links) {
    const date = new Date(link.created_at);
    const key = date.toISOString().split("T")[0];
    if (!groups[key]) groups[key] = [];
    groups[key].push(link);
  }
  return Object.entries(groups)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, items]) => ({ date, label: formatGroupDate(date), links: items }));
}

export default function LinkGrid({ links, loading, onTagClick }) {
  if (loading) {
    return (
      <div className="space-y-8">
        {[0, 1].map((row) => (
          <div key={row}>
            <div className="flex items-center gap-3 mb-3 px-5 sm:px-8">
              <div className="h-3 w-20 rounded" style={{ backgroundColor: "var(--color-surface-alt)" }} />
            </div>
            <div className="flex gap-4 overflow-hidden px-5 sm:px-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 overflow-hidden"
                  style={{
                    width: "260px",
                    borderRadius: "var(--radius)",
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border-light)",
                  }}
                >
                  <div style={{ aspectRatio: "16/10", backgroundColor: "var(--color-surface-alt)" }} />
                  <div className="p-3.5 space-y-2">
                    <div className="h-4 rounded" style={{ width: "80%", backgroundColor: "var(--color-surface-alt)" }} />
                    <div className="h-3 rounded" style={{ width: "100%", backgroundColor: "var(--color-surface-alt)" }} />
                    <div className="h-3 rounded" style={{ width: "60%", backgroundColor: "var(--color-surface-alt)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const groups = groupByDate(links);

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.date} className="animate-in">
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-5 sm:px-8 pb-2">
            {group.links.map((link) => {
              const cat = link.categories;
              const catSlug = cat?.slug || "other";
              const catColor = CATEGORY_COLORS[catSlug] || "#94a3b8";

              return (
                <div key={link.id} className="flex-shrink-0" style={{ width: "260px" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      {cat && (
                        <>
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: catColor }}
                          />
                          <span
                            className="text-[10px]"
                            style={{ color: "var(--color-text-muted)", fontWeight: 500 }}
                          >
                            {cat.name.toLowerCase()}
                          </span>
                        </>
                      )}
                      {link.tags?.slice(0, 1).map((tag) => (
                        <span key={tag} className="flex items-center gap-1">
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: "#94a3b8" }}
                          />
                          <span
                            className="text-[10px]"
                            style={{ color: "var(--color-text-muted)", fontWeight: 500 }}
                          >
                            {tag}
                          </span>
                        </span>
                      ))}
                    </div>
                    <span
                      className="text-[10px]"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {group.label}
                    </span>
                  </div>
                  <LinkCard link={link} onTagClick={onTagClick} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
