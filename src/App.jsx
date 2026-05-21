import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import LinkGrid from "./components/LinkGrid";
import EmptyState from "./components/EmptyState";
import ActiveFilters from "./components/ActiveFilters";
import Pagination from "./components/Pagination";
import { useLinks } from "./hooks/useLinks";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("becomelinks-dark");
      if (saved !== null) return saved === "true";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("becomelinks-dark", darkMode);
  }, [darkMode]);

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
    <div
      className="min-h-screen transition-colors duration-500"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <Header
        total={total}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <main className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10 space-y-10">
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
            {!loading && (
              <div className="animate-fade-in">
                <p
                  className="text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 500,
                    color: "var(--color-text-tertiary)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {hasFilters ? (
                    <>
                      {links.length} of {total} links
                    </>
                  ) : (
                    <>{total} links</>
                  )}
                </p>
              </div>
            )}

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

      <footer
        className="mt-16 transition-colors duration-500"
        style={{ borderTop: "1px solid var(--color-border-subtle)" }}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-8 flex items-center justify-between">
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              color: "var(--color-text-tertiary)",
            }}
          >
            BecomeLinks — Mention @save in Slack to add links
          </p>
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              color: "var(--color-text-tertiary)",
            }}
          >
            Curated by AI
          </p>
        </div>
      </footer>
    </div>
  );
}
