export default function Header({ total }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.886-3.497l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757M10.5 15.75l3-3"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                BecomeLinks
              </h1>
              <p className="text-xs text-gray-500 -mt-0.5 hidden sm:block">
                Your team's link directory
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                {total} links
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Live
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
