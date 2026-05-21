export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let start = Math.max(1, page - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  const btnStyle = {
    fontFamily: "var(--font-sans)",
    borderRadius: "var(--radius-md)",
  };

  return (
    <div className="flex items-center justify-center gap-1 mt-12 mb-4">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="p-2.5 text-sm transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
        style={{
          ...btnStyle,
          color: "var(--color-text-secondary)",
        }}
        onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--color-hover)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      {start > 1 && (
        <>
          <PageBtn page={1} current={page} onClick={onPageChange} style={btnStyle} />
          {start > 2 && (
            <span className="w-9 h-9 flex items-center justify-center" style={{ color: "var(--color-text-tertiary)" }}>
              ...
            </span>
          )}
        </>
      )}

      {pages.map((p) => (
        <PageBtn key={p} page={p} current={page} onClick={onPageChange} style={btnStyle} />
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="w-9 h-9 flex items-center justify-center" style={{ color: "var(--color-text-tertiary)" }}>
              ...
            </span>
          )}
          <PageBtn page={totalPages} current={page} onClick={onPageChange} style={btnStyle} />
        </>
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="p-2.5 text-sm transition-all duration-200 disabled:opacity-20 disabled:cursor-not-allowed"
        style={{
          ...btnStyle,
          color: "var(--color-text-secondary)",
        }}
        onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = "var(--color-hover)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
}

function PageBtn({ page, current, onClick, style }) {
  const isActive = page === current;
  return (
    <button
      onClick={() => onClick(page)}
      className="w-9 h-9 text-xs transition-all duration-200"
      style={{
        ...style,
        fontWeight: isActive ? 500 : 400,
        backgroundColor: isActive ? "var(--color-text)" : "transparent",
        color: isActive ? "var(--color-bg)" : "var(--color-text-secondary)",
      }}
      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "var(--color-hover)"; }}
      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
    >
      {page}
    </button>
  );
}
