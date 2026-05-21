import LinkCard from "./LinkCard";

export default function LinkGrid({ links, loading, onTagClick }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse"
          >
            <div className="aspect-[2/1] bg-gray-100" />
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded w-full" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
              <div className="flex gap-1.5">
                <div className="h-5 w-14 bg-gray-100 rounded-md" />
                <div className="h-5 w-16 bg-gray-100 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} onTagClick={onTagClick} />
      ))}
    </div>
  );
}
