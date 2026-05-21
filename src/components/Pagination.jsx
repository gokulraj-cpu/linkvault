export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-10 mb-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 text-xs transition-opacity duration-200 disabled:opacity-20"
        style={{
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
      >
        prev
      </button>
      <span className="text-xs px-2" style={{ color: "var(--color-text-muted)" }}>
        {page} / {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1.5 text-xs transition-opacity duration-200 disabled:opacity-20"
        style={{
          borderRadius: "var(--radius-pill)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
      >
        next
      </button>
    </div>
  );
}
