import { useState, useEffect, useRef } from "react";

export default function SearchBar({ value, onChange }) {
  const [local, setLocal] = useState(value);
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(val), 300);
  };

  const handleClear = () => {
    setLocal("");
    onChange("");
  };

  return (
    <div
      className="relative transition-all duration-500"
      style={{
        transform: focused ? "scale(1.005)" : "scale(1)",
      }}
    >
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
        <svg
          className="h-4 w-4 transition-colors duration-300"
          style={{ color: focused ? "var(--color-accent)" : "var(--color-text-tertiary)" }}
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
      <input
        type="text"
        value={local}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search by title, URL, channel, or person..."
        className="block w-full pl-12 pr-12 py-4 text-sm tracking-wide outline-none transition-all duration-300"
        style={{
          fontFamily: "var(--font-sans)",
          fontWeight: 300,
          backgroundColor: "var(--color-bg-elevated)",
          color: "var(--color-text)",
          borderRadius: "var(--radius-xl)",
          border: `1px solid ${focused ? "var(--color-accent-soft)" : "var(--color-border)"}`,
          boxShadow: focused
            ? "0 0 0 3px var(--color-accent-bg), var(--shadow-card)"
            : "var(--shadow-subtle)",
        }}
      />
      {local && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-5 flex items-center transition-colors duration-200"
          style={{ color: "var(--color-text-tertiary)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-text-secondary)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-text-tertiary)"}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
