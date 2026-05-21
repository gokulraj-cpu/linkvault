import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import LinkGrid from "./components/LinkGrid";
import EmptyState from "./components/EmptyState";
import ActiveFilters from "./components/ActiveFilters";
import Pagination from "./components/Pagination";
import { useLinks } from "./hooks/useLinks";

export default function App() {
  const {
    links,
    categories,
    channels,
    loading,
    total,
    page,
    totalPages,
    filters,
    setPage,
    updateFilters,
  } = useLinks();

  const hasFilters = !!(
    filters.search ||
    filters.category ||
    filters.channel ||
    filters.tag
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header total={total} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <SearchBar
          value={filters.search}
          onChange={(search) => updateFilters({ search })}
        />

        <CategoryFilter
          categories={categories}
          channels={channels}
          activeCategory={filters.category}
          activeChannel={filters.channel}
          onCategoryChange={(category) => updateFilters({ category })}
          onChannelChange={(channel) => updateFilters({ channel })}
        />

        <ActiveFilters
          filters={filters}
          categories={categories}
          onUpdate={updateFilters}
        />

        {!loading && links.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onClear={() =>
              updateFilters({
                search: "",
                category: "",
                channel: "",
                tag: "",
              })
            }
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                {hasFilters ? (
                  <>
                    Showing{" "}
                    <span className="font-medium text-gray-900">
                      {links.length}
                    </span>{" "}
                    of {total} links
                  </>
                ) : (
                  <>
                    <span className="font-medium text-gray-900">{total}</span>{" "}
                    links saved
                  </>
                )}
              </p>
            </div>

            <LinkGrid
              links={links}
              loading={loading}
              onTagClick={(tag) => updateFilters({ tag })}
            />

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            BecomeLinks — Mention @save in Slack to add links
          </p>
          <p className="text-xs text-gray-400">
            Powered by AI categorization
          </p>
        </div>
      </footer>
    </div>
  );
}
