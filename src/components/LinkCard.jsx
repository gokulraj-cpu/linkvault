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

function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  return `${months}mo`;
}

export default function LinkCard({ link, onTagClick }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const category = link.categories;
  const catSlug = category?.slug || "other";
  const catColor = CATEGORY_COLORS[catSlug] || "#94a3b8";
  const hasImage = link.image && !imgError;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden transition-all duration-300"
      style={{
        borderRadius: "20px",
        backgroundColor: catColor,
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.15)" : "0 2px 8px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="p-4 pb-3 space-y-3">
        <div className="flex items-center justify-between">
          <span
            className="inline-block px-2.5 py-1 rounded-full text-[10px] uppercase"
            style={{
              backgroundColor: "rgba(0,0,0,0.15)",
              color: "white",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            {category?.name || "Other"}
          </span>
          <div className="flex items-center gap-2">
            {link.shared_by_avatar && (
              <img
                src={link.shared_by_avatar}
                alt=""
                className="rounded-full"
                style={{ width: 22, height: 22, border: "2px solid rgba(255,255,255,0.4)" }}
              />
            )}
          </div>
        </div>

        <h3
          className="line-clamp-3"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: "24px",
            lineHeight: 1.15,
            color: "white",
            letterSpacing: "-0.01em",
          }}
        >
          {link.title || getDomain(link.url)}
        </h3>
      </div>

      {hasImage ? (
        <div className="px-4 pb-4">
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: "14px", aspectRatio: "16/10" }}
          >
            {!imgLoaded && (
              <div
                className="absolute inset-0"
                style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
              />
            )}
            <img
              src={link.image}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500"
              style={{
                transform: hovered ? "scale(1.04)" : "scale(1)",
                opacity: imgLoaded ? 1 : 0,
              }}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          </div>
        </div>
      ) : (
        <div className="px-4 pb-2">
          {link.description && (
            <p
              className="text-[12px] leading-relaxed line-clamp-2"
              style={{ color: "rgba(255,255,255,0.7)", fontWeight: 300 }}
            >
              {link.description}
            </p>
          )}
        </div>
      )}

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {link.tags?.length > 0 && link.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onTagClick?.(tag); }}
                className="text-[10px] px-2 py-0.5 rounded-full cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: 500,
                }}
              >
                {tag}
              </span>
            ))}
            {(!link.tags || link.tags.length === 0) && (
              <span
                className="text-[10px]"
                style={{ color: "rgba(255,255,255,0.5)" }}
              >
                {getDomain(link.url)} · {timeAgo(link.created_at)}
              </span>
            )}
          </div>
          <div
            className="flex items-center justify-center rounded-full transition-all duration-300"
            style={{
              width: 32,
              height: 32,
              backgroundColor: hovered ? "white" : "rgba(255,255,255,0.2)",
            }}
          >
            <svg
              style={{
                width: 14,
                height: 14,
                color: hovered ? catColor : "white",
                transition: "all 0.3s",
                transform: hovered ? "translate(1px,-1px)" : "none",
              }}
              fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
}
