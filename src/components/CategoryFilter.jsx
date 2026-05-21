export default function CategoryFilter({
  categories,
  channels,
  activeCategory,
  activeChannel,
  onCategoryChange,
  onChannelChange,
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange("")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              !activeCategory
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                onCategoryChange(activeCategory === cat.id ? "" : cat.id)
              }
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              style={
                activeCategory === cat.id
                  ? { backgroundColor: cat.color }
                  : undefined
              }
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              {cat.link_count > 0 && (
                <span
                  className={`text-xs ${
                    activeCategory === cat.id
                      ? "text-white/70"
                      : "text-gray-400"
                  }`}
                >
                  {cat.link_count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {channels.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Channels
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onChannelChange("")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                !activeChannel
                  ? "bg-gray-800 text-white shadow-sm"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              All channels
            </button>
            {channels.map((ch) => (
              <button
                key={ch.name}
                onClick={() =>
                  onChannelChange(activeChannel === ch.name ? "" : ch.name)
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeChannel === ch.name
                    ? "bg-gray-800 text-white shadow-sm"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span className="text-gray-400">#</span>
                <span>{ch.name}</span>
                <span
                  className={`text-xs ${
                    activeChannel === ch.name
                      ? "text-white/70"
                      : "text-gray-400"
                  }`}
                >
                  {ch.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
