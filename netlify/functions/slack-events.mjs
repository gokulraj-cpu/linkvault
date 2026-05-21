import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import crypto from "crypto";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

function verifySlackSignature(event) {
  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  const timestamp = event.headers["x-slack-request-timestamp"];
  const slackSignature = event.headers["x-slack-signature"];

  if (!timestamp || !slackSignature) return false;

  const fiveMinutesAgo = Math.floor(Date.now() / 1000) - 60 * 5;
  if (parseInt(timestamp) < fiveMinutesAgo) return false;

  const sigBasestring = `v0:${timestamp}:${event.body}`;
  const mySignature =
    "v0=" +
    crypto
      .createHmac("sha256", signingSecret)
      .update(sigBasestring, "utf8")
      .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(mySignature, "utf8"),
    Buffer.from(slackSignature, "utf8")
  );
}

function extractUrls(text) {
  const urlRegex = /<(https?:\/\/[^>|]+)(?:\|[^>]*)?>/g;
  const urls = [];
  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    urls.push(match[1]);
  }
  if (urls.length === 0) {
    const plainUrlRegex = /https?:\/\/[^\s<>]+/g;
    while ((match = plainUrlRegex.exec(text)) !== null) {
      urls.push(match[0]);
    }
  }
  return urls;
}

async function fetchPageMetadata(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BecomeLinks/1.0; +https://becomelinks.netlify.app)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timeout);
    const html = await res.text();

    const getMetaContent = (name) => {
      const match = html.match(
        new RegExp(
          `<meta[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']+)["']`,
          "i"
        )
      );
      if (match) return match[1];
      const reversed = html.match(
        new RegExp(
          `<meta[^>]*content=["']([^"']+)["'][^>]*(?:name|property)=["']${name}["']`,
          "i"
        )
      );
      return reversed ? reversed[1] : null;
    };

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title =
      getMetaContent("og:title") || (titleMatch ? titleMatch[1].trim() : null);
    const description =
      getMetaContent("og:description") || getMetaContent("description");
    let image = getMetaContent("og:image") || getMetaContent("twitter:image") || getMetaContent("twitter:image:src");
    if (image && !image.startsWith("http")) {
      const urlObj = new URL(url);
      image = image.startsWith("/")
        ? `${urlObj.origin}${image}`
        : `${urlObj.origin}/${image}`;
    }

    const faviconMatch = html.match(
      /<link[^>]*rel=["'](?:shortcut )?icon["'][^>]*href=["']([^"']+)["']/i
    );
    let favicon = faviconMatch ? faviconMatch[1] : null;
    if (favicon && !favicon.startsWith("http")) {
      const urlObj = new URL(url);
      favicon = favicon.startsWith("/")
        ? `${urlObj.origin}${favicon}`
        : `${urlObj.origin}/${favicon}`;
    }
    if (!favicon) {
      favicon = `${new URL(url).origin}/favicon.ico`;
    }

    return { title, description, image, favicon };
  } catch {
    return {
      title: null,
      description: null,
      image: null,
      favicon: `${new URL(url).origin}/favicon.ico`,
    };
  }
}

async function categorizeLink(url, title, description) {
  try {
    const { data: categories } = await supabase
      .from("categories")
      .select("id, name, slug");

    const categoryList = categories.map((c) => c.name).join(", ");

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 200,
      messages: [
        {
          role: "user",
          content: `Categorize this link into exactly one of these categories: ${categoryList}

URL: ${url}
Title: ${title || "Unknown"}
Description: ${description || "None"}

Also suggest 2-4 short tags (lowercase, single words or hyphenated).

Respond in JSON only: {"category": "Category Name", "tags": ["tag1", "tag2"]}`,
        },
      ],
    });

    const text = message.content[0].text;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");

    const result = JSON.parse(jsonMatch[0]);
    const matched = categories.find(
      (c) => c.name.toLowerCase() === result.category.toLowerCase()
    );

    return {
      categoryId: matched ? matched.id : categories.find((c) => c.slug === "other")?.id,
      tags: Array.isArray(result.tags) ? result.tags.slice(0, 5) : [],
    };
  } catch {
    const { data: categories } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", "other")
      .single();
    return { categoryId: categories?.id, tags: [] };
  }
}

async function getUserInfo(userId) {
  try {
    const res = await fetch(`https://slack.com/api/users.info?user=${userId}`, {
      headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` },
    });
    const data = await res.json();
    if (data.ok) {
      return {
        name: data.user.real_name || data.user.name,
        avatar: data.user.profile.image_72,
      };
    }
  } catch {}
  return { name: "Unknown", avatar: null };
}

async function getChannelInfo(channelId) {
  try {
    const res = await fetch(
      `https://slack.com/api/conversations.info?channel=${channelId}`,
      { headers: { Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}` } }
    );
    const data = await res.json();
    if (data.ok) return data.channel.name;
  } catch {}
  return "unknown-channel";
}

async function postSlackReply(channel, threadTs, text) {
  try {
    await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ channel, thread_ts: threadTs, text }),
    });
  } catch {}
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const retryNum = req.headers.get("x-slack-retry-num");
  if (retryNum) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const body = await req.text();
  const payload = JSON.parse(body);

  if (payload.type === "url_verification") {
    return new Response(JSON.stringify({ challenge: payload.challenge }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const event = {
    body,
    headers: Object.fromEntries(req.headers.entries()),
  };

  if (!verifySlackSignature(event)) {
    return new Response("Invalid signature", { status: 401 });
  }

  if (payload.type === "event_callback") {
    const slackEvent = payload.event;

    if (slackEvent.type === "app_mention" || slackEvent.type === "message") {
      const text = slackEvent.text || "";
      const urls = extractUrls(text);

      if (urls.length > 0) {
        const [userInfo, channelName] = await Promise.all([
          getUserInfo(slackEvent.user),
          getChannelInfo(slackEvent.channel),
        ]);

        for (const url of urls) {
          const { data: existing } = await supabase
            .from("links")
            .select("id")
            .eq("url", url)
            .eq("slack_message_ts", slackEvent.ts)
            .maybeSingle();

          if (existing) continue;

          const metadata = await fetchPageMetadata(url);
          const { categoryId, tags } = await categorizeLink(
            url,
            metadata.title,
            metadata.description
          );

          const { error } = await supabase.from("links").insert({
            url,
            title: metadata.title || url,
            description: metadata.description,
            favicon: metadata.favicon,
            image: metadata.image,
            category_id: categoryId,
            channel_id: slackEvent.channel,
            channel_name: channelName,
            shared_by_id: slackEvent.user,
            shared_by_name: userInfo.name,
            shared_by_avatar: userInfo.avatar,
            slack_message_ts: slackEvent.ts,
            tags,
          });

          if (error) {
            console.error("Supabase insert error:", error);
            await postSlackReply(
              slackEvent.channel,
              slackEvent.ts,
              `Failed to save link: ${error.message}`
            );
            return new Response(JSON.stringify({ error: error.message }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
            });
          }
        }

        const savedCount = urls.length;
        const emoji = savedCount === 1 ? "🔖" : "📚";
        await postSlackReply(
          slackEvent.channel,
          slackEvent.ts,
          `${emoji} Saved ${savedCount} link${savedCount > 1 ? "s" : ""} to BecomeLinks!`
        );
      }
    }
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
};

export const config = { path: "/api/slack-events" };
