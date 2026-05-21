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
    links, categories, channels, loading,
    total, page, totalPages, filters,
    setPage, updateFilters,
  } = useLinks();

  const hasFilters = !!(filters.search || filters.category || filters.channel || filters.tag);

  return (
    <div
      className="min-h-screen relative transition-colors duration-300"
      style={{ backgroundColor: "var(--color-bg)" }}
    >
      <Header
        total={total}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-6 pb-4">
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
      </div>

      <div className="pt-2 pb-8">
        {!loading && links.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onClear={() => updateFilters({ search: "", category: "", channel: "", tag: "" })}
          />
        ) : (
          <>
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
      </div>

      <footer style={{ borderTop: "1px solid var(--color-border-light)" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex items-center justify-between">
          <p className="text-[11px]" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
            BecomeLinks
          </p>
          <p className="text-[11px]" style={{ color: "var(--color-text-muted)", fontWeight: 300 }}>
            @save in Slack to add
          </p>
        </div>
      </footer>
    </div>
  );
}
