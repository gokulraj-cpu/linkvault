export default function EmptyState({ hasFilters, onClear }) {
  if (hasFilters) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          No links found
        </h3>
        <p className="text-sm text-gray-500 mb-4 max-w-sm mx-auto">
          No links match your current filters. Try adjusting your search or
          clearing filters.
        </p>
        <button
          onClick={onClear}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.886-3.497l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757M10.5 15.75l3-3"
          />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        No links saved yet
      </h3>
      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
        Mention{" "}
        <code className="px-1.5 py-0.5 bg-gray-100 rounded-md text-indigo-600 font-mono text-xs">
          @save
        </code>{" "}
        with a link in any public Slack channel and it will appear here
        automatically, categorized and searchable.
      </p>
      <div className="mt-8 p-4 bg-gray-50 rounded-2xl max-w-sm mx-auto text-left">
        <p className="text-xs font-medium text-gray-500 mb-2">Example:</p>
        <div className="bg-white rounded-xl p-3 border border-gray-200">
          <p className="text-sm text-gray-700">
            <span className="text-blue-600 font-medium">@save</span>{" "}
            <span className="text-blue-500 underline">
              https://example.com/great-article
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
