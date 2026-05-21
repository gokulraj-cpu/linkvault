import { useState } from "react";

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function LinkCard({ link, onTagClick, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const category = link.categories;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden animate-stagger"
      style={{
        animationDelay: `${index * 60}ms`,
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--color-bg-elevated)",
        border: `1px solid ${hovered ? "var(--color-border)" : "var(--color-border-subtle)"}`,
        boxShadow: hovered ? "var(--shadow-hover)" : "var(--shadow-subtle)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {link.image && !imageError && (
        <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
          {!imageLoaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          <img
            src={link.image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700"
            style={{
              transform: hovered ? "scale(1.03)" : "scale(1)",
              opacity: imageLoaded ? 1 : 0,
              transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
            }}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.06) 0%, transparent 40%)",
              opacity: hovered ? 1 : 0,
            }}
          />
        </div>
      )}

      <div className="p-5 space-y-3">
        <div className="flex items-start gap-3">
          <img
            src={link.favicon}
            alt=""
            className="w-4 h-4 rounded mt-1 flex-shrink-0 opacity-60"
            onError={(e) => { e.target.style.display = "none"; }}
          />
          <div className="min-w-0 flex-1">
            <h3
              className="text-sm leading-snug line-clamp-2 transition-colors duration-300"
              style={{
                fontFamily: "var(--font-sans)",
                fontWeight: 500,
                color: "var(--color-text)",
              }}
            >
              {link.title || getDomain(link.url)}
            </h3>
            <p
              className="text-xs mt-1 truncate"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {getDomain(link.url)}
            </p>
          </div>
        </div>

        {link.description && (
          <p
            className="text-xs leading-relaxed line-clamp-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              color: "var(--color-text-secondary)",
            }}
          >
            {link.description}
          </p>
        )}

        {link.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {link.tags.map((tag) => (
              <span
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                className="inline-flex items-center px-2 py-0.5 text-[11px] tracking-wide cursor-pointer transition-all duration-200"
                style={{
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--color-accent-bg)",
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-accent)";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-accent-bg)";
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid var(--color-border-subtle)" }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {link.shared_by_avatar ? (
              <img
                src={link.shared_by_avatar}
                alt=""
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{ opacity: 0.8 }}
              />
            ) : (
              <div
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: "var(--color-bg-muted)" }}
              />
            )}
            <span
              className="text-xs truncate"
              style={{ color: "var(--color-text-tertiary)", fontWeight: 400 }}
            >
              {link.shared_by_name}
            </span>
            <span style={{ color: "var(--color-border)" }}>·</span>
            <span
              className="text-xs flex items-center gap-0.5 flex-shrink-0"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              <span style={{ opacity: 0.5 }}>#</span>
              {link.channel_name}
            </span>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            {category && (
              <span
                className="text-[10px] tracking-wide uppercase"
                style={{
                  color: "var(--color-accent-soft)",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                }}
              >
                {category.name}
              </span>
            )}
            <span
              className="text-[11px]"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {timeAgo(link.created_at)}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
