import LinkCard from "./LinkCard";

export default function LinkGrid({ links, loading, onTagClick }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5 sm:px-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden"
            style={{
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
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5 sm:px-8">
      {links.map((link) => (
        <div key={link.id} className="animate-in">
          <LinkCard link={link} onTagClick={onTagClick} />
        </div>
      ))}
    </div>
  );
}
