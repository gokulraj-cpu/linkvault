import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req) => {
  const url = new URL(req.url);
  const search = url.searchParams.get("search") || "";
  const category = url.searchParams.get("category") || "";
  const channel = url.searchParams.get("channel") || "";
  const tag = url.searchParams.get("tag") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "24"), 100);
  const offset = (page - 1) * limit;

  let query = supabase
    .from("links")
    .select("*, categories(name, slug, icon, color)", { count: "exact" });

  if (search) {
    query = query.or(
      `title.ilike.%${search}%,description.ilike.%${search}%,url.ilike.%${search}%,channel_name.ilike.%${search}%,shared_by_name.ilike.%${search}%`
    );
  }

  if (category) {
    query = query.eq("categories.slug", category);
  }

  if (channel) {
    query = query.eq("channel_name", channel);
  }

  if (tag) {
    query = query.contains("tags", [tag]);
  }

  query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const filtered = category
    ? data.filter((link) => link.categories?.slug === category)
    : data;

  return new Response(
    JSON.stringify({
      links: filtered,
      total: count,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

export const config = { path: "/api/links" };
