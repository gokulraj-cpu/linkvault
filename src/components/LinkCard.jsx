import { useState } from "react";

const CATEGORY_COLORS = {
  engineering: "#4a9eff",
  design: "#e879a0",
  product: "#a78bfa",
  marketing: "#f59e0b",
  documentation: "#34d399",
  "tools-resources": "#6366f1",
  "articles-blogs": "#ef4444",
  "videos-tutorials": "#14b8a6",
  research: "#c084fc",
  other: "#94a3b8",
};

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function LinkCard({ link, onTagClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const category = link.categories;
  const catSlug = category?.slug || "other";
  const catColor = CATEGORY_COLORS[catSlug] || "#94a3b8";

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block flex-shrink-0 overflow-hidden transition-all duration-300"
      style={{
        width: "260px",
        borderRadius: "var(--radius)",
        backgroundColor: "var(--color-surface)",
        border: `1px solid ${hovered ? "var(--color-border)" : "var(--color-border-light)"}`,
        transform: hovered ? "translateY(-2px)" : "none",
        boxShadow: hovered ? "0 8px 24px rgba(0,0,0,0.08)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {link.image && !imgError && (
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
          {!imgLoaded && (
            <div className="absolute inset-0" style={{ backgroundColor: "var(--color-surface-alt)" }} />
          )}
          <img
            src={link.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.03)" : "scale(1)", opacity: imgLoaded ? 1 : 0 }}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <div className="p-3.5 space-y-2">
        <h3
          className="text-[13px] font-medium leading-snug line-clamp-2"
          style={{ color: "var(--color-text)" }}
        >
          {link.title || getDomain(link.url)}
        </h3>

        {link.description && (
          <p
            className="text-[11px] leading-relaxed line-clamp-3"
            style={{ color: "var(--color-text-secondary)", fontWeight: 300 }}
          >
            {link.description}
          </p>
        )}

        <div className="flex items-center gap-1 pt-1">
          <svg className="w-3 h-3 flex-shrink-0" style={{ color: "var(--color-text-muted)" }} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.886-3.497l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
          </svg>
          <span
            className="text-[11px] truncate"
            style={{ color: "var(--color-text-muted)" }}
          >
            {getDomain(link.url)}
          </span>
        </div>

        {link.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-0.5">
            {link.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick?.(tag); }}
                className="text-[10px] px-1.5 py-0.5 cursor-pointer transition-colors duration-200"
                style={{
                  borderRadius: "4px",
                  backgroundColor: "var(--color-surface-alt)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}
