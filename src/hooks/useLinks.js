import { useState, useEffect, useCallback } from "react";
import { supabase, isConfigured } from "../lib/supabase";

export function useLinks() {
  const [links, setLinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    channel: "",
    tag: "",
  });

  const LIMIT = 24;

  const fetchLinks = useCallback(async () => {
    if (!isConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const offset = (page - 1) * LIMIT;

      let query = supabase
        .from("links")
        .select("*, categories(name, slug, icon, color)", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(offset, offset + LIMIT - 1);

      if (filters.search) {
        query = query.or(
          `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,url.ilike.%${filters.search}%,channel_name.ilike.%${filters.search}%,shared_by_name.ilike.%${filters.search}%`
        );
      }

      if (filters.category) {
        query = query.eq("category_id", filters.category);
      }

      if (filters.channel) {
        query = query.eq("channel_name", filters.channel);
      }

      if (filters.tag) {
        query = query.contains("tags", [filters.tag]);
      }

      const { data, count } = await query;
      setLinks(data || []);
      setTotal(count || 0);
      setTotalPages(Math.ceil((count || 0) / LIMIT));
    } catch (err) {
      console.error("Failed to fetch links:", err);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const fetchCategories = useCallback(async () => {
    if (!isConfigured) return;
    try {
      const { data } = await supabase
        .from("categories")
        .select("*")
        .order("link_count", { ascending: false });
      setCategories(data || []);
    } catch {
      setCategories([]);
    }
  }, []);

  const fetchChannels = useCallback(async () => {
    if (!isConfigured) return;
    try {
      const { data } = await supabase.from("links").select("channel_name");
      const channelCounts = {};
      for (const row of data || []) {
        channelCounts[row.channel_name] =
          (channelCounts[row.channel_name] || 0) + 1;
      }
      const sorted = Object.entries(channelCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
      setChannels(sorted);
    } catch {
      setChannels([]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchChannels();
  }, [fetchCategories, fetchChannels]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  useEffect(() => {
    if (!isConfigured) return;
    const subscription = supabase
      .channel("links-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "links" },
        () => {
          fetchLinks();
          fetchCategories();
          fetchChannels();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fetchLinks, fetchCategories, fetchChannels]);

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setPage(1);
  }, []);

  return {
    links,
    categories,
    channels,
    loading,
    total,
    page,
    totalPages,
    filters,
    setPage,
    updateFilters,
  };
}
