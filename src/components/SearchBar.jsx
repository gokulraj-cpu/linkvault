import { useState, useEffect, useRef } from "react";

export default function SearchBar({ value, onChange }) {
  const [local, setLocal] = useState(value);
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => { setLocal(value); }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setLocal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onChange(val), 300);
  };

  return (
    <div className="max-w-lg mx-auto w-full relative">
      <input
        type="text"
        value={local}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="what are you looking for today?"
        className="block w-full text-center py-3 text-sm outline-none transition-all duration-300"
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "15px",
          backgroundColor: "transparent",
          color: "var(--color-text)",
          borderBottom: `1px solid ${focused ? "var(--color-text-muted)" : "var(--color-border)"}`,
          letterSpacing: "0.01em",
        }}
      />
      {local && (
        <button
          onClick={() => { setLocal(""); onChange(""); }}
          className="absolute right-0 top-1/2 -translate-y-1/2"
          style={{ color: "var(--color-text-muted)" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
