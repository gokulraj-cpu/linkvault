export default function Header({ total, darkMode, onToggleDarkMode }) {
  return (
    <header className="pt-10 pb-6">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center">
        <h1
          className="text-3xl sm:text-4xl tracking-tight"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
        >
          BecomeLinks
        </h1>
        <p
          className="text-xs mt-1.5 tracking-wide"
          style={{ color: "var(--color-text-muted)", fontFamily: "var(--font-sans)", fontWeight: 400 }}
        >
          your curated links, organized
        </p>

        <div className="absolute top-5 right-5 sm:right-8 flex items-center gap-3">
          <span
            className="text-[10px] tracking-widest uppercase hidden sm:block"
            style={{ color: "var(--color-text-muted)" }}
          >
            {total} links
          </span>
          <button
            onClick={onToggleDarkMode}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: "var(--color-surface-alt)" }}
          >
            {darkMode ? (
              <svg className="w-3.5 h-3.5" style={{ color: "var(--color-text-secondary)" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" style={{ color: "var(--color-text-secondary)" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
