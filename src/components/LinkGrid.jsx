import LinkCard from "./LinkCard";

export default function LinkGrid({ links, loading, onTagClick }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 sm:px-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden"
            style={{
              borderRadius: "20px",
              backgroundColor: "var(--color-surface-alt)",
              overflow: "hidden",
            }}
          >
            <div className="p-4 space-y-3">
              <div className="h-5 rounded-full" style={{ width: "30%", backgroundColor: "rgba(0,0,0,0.06)" }} />
              <div className="h-6 rounded" style={{ width: "85%", backgroundColor: "rgba(0,0,0,0.06)" }} />
              <div className="h-5 rounded" style={{ width: "60%", backgroundColor: "rgba(0,0,0,0.06)" }} />
            </div>
            <div className="px-4 pb-4">
              <div style={{ aspectRatio: "16/10", borderRadius: "14px", backgroundColor: "rgba(0,0,0,0.04)" }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-5 sm:px-8">
      {links.map((link) => (
        <div key={link.id} className="animate-in">
          <LinkCard link={link} onTagClick={onTagClick} />
        </div>
      ))}
    </div>
  );
}
