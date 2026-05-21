const API_BASE = "/api";

async function fetchJSON(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getLinks({ search, category, channel, tag, page = 1 } = {}) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (channel) params.set("channel", channel);
  if (tag) params.set("tag", tag);
  params.set("page", String(page));
  return fetchJSON(`/links?${params}`);
}

export async function getCategories() {
  return fetchJSON("/categories");
}

export async function getChannels() {
  return fetchJSON("/channels");
}
