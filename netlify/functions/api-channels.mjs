import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async () => {
  const { data, error } = await supabase
    .from("links")
    .select("channel_name")
    .order("channel_name");

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const channelCounts = {};
  for (const row of data) {
    channelCounts[row.channel_name] =
      (channelCounts[row.channel_name] || 0) + 1;
  }

  const channels = Object.entries(channelCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  return new Response(JSON.stringify({ channels }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export const config = { path: "/api/channels" };
