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

export default function LinkCard({ link, onTagClick }) {
  const category = link.categories;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 hover:-translate-y-0.5"
    >
      {link.image && (
        <div className="aspect-[2/1] overflow-hidden bg-gray-100">
          <img
            src={link.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.parentElement.style.display = "none";
            }}
          />
        </div>
      )}

      <div className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={link.favicon}
            alt=""
            className="w-5 h-5 rounded mt-0.5 flex-shrink-0"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {link.title || getDomain(link.url)}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 truncate">
              {getDomain(link.url)}
            </p>
          </div>
        </div>

        {link.description && (
          <p className="mt-2.5 text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {link.description}
          </p>
        )}

        {link.tags?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {link.tags.map((tag) => (
              <span
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            {link.shared_by_avatar ? (
              <img
                src={link.shared_by_avatar}
                alt=""
                className="w-5 h-5 rounded-full flex-shrink-0"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gray-200 flex-shrink-0" />
            )}
            <span className="text-xs text-gray-500 truncate">
              {link.shared_by_name}
            </span>
            <span className="text-gray-300">·</span>
            <span className="text-xs text-gray-400 flex items-center gap-1 flex-shrink-0">
              <span className="text-gray-300">#</span>
              {link.channel_name}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {category && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${category.color}15`,
                  color: category.color,
                }}
              >
                <span className="text-[10px]">{category.icon}</span>
                {category.name}
              </span>
            )}
            <span className="text-xs text-gray-400">
              {timeAgo(link.created_at)}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
