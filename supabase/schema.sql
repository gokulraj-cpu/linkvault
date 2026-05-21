-- LinkVault Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Enable full-text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT '📁',
  color TEXT NOT NULL DEFAULT '#6366f1',
  link_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Links table
CREATE TABLE links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  favicon TEXT,
  image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  channel_id TEXT NOT NULL,
  channel_name TEXT NOT NULL,
  shared_by_id TEXT NOT NULL,
  shared_by_name TEXT NOT NULL,
  shared_by_avatar TEXT,
  slack_message_ts TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for search performance
CREATE INDEX idx_links_created_at ON links(created_at DESC);
CREATE INDEX idx_links_category_id ON links(category_id);
CREATE INDEX idx_links_channel_name ON links(channel_name);
CREATE INDEX idx_links_tags ON links USING GIN(tags);
CREATE INDEX idx_links_title_trgm ON links USING GIN(title gin_trgm_ops);
CREATE INDEX idx_links_description_trgm ON links USING GIN(description gin_trgm_ops);

-- Full-text search column (populated by trigger)
ALTER TABLE links ADD COLUMN fts tsvector;
CREATE INDEX idx_links_fts ON links USING GIN(fts);

-- Trigger to keep fts column up to date
CREATE OR REPLACE FUNCTION update_links_fts()
RETURNS TRIGGER AS $$
BEGIN
  NEW.fts :=
    setweight(to_tsvector('english', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(NEW.description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(NEW.channel_name, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(NEW.tags, ' '), '')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_fts
  BEFORE INSERT OR UPDATE ON links
  FOR EACH ROW EXECUTE FUNCTION update_links_fts();

-- Function to increment category link count
CREATE OR REPLACE FUNCTION increment_category_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.category_id IS NOT NULL THEN
    UPDATE categories SET link_count = link_count + 1 WHERE id = NEW.category_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement category link count
CREATE OR REPLACE FUNCTION decrement_category_count()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.category_id IS NOT NULL THEN
    UPDATE categories SET link_count = link_count - 1 WHERE id = OLD.category_id;
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_increment_category
  AFTER INSERT ON links
  FOR EACH ROW EXECUTE FUNCTION increment_category_count();

CREATE TRIGGER trigger_decrement_category
  AFTER DELETE ON links
  FOR EACH ROW EXECUTE FUNCTION decrement_category_count();

-- Seed default categories
INSERT INTO categories (name, slug, icon, color) VALUES
  ('Engineering', 'engineering', '⚙️', '#3b82f6'),
  ('Design', 'design', '🎨', '#ec4899'),
  ('Product', 'product', '📦', '#8b5cf6'),
  ('Marketing', 'marketing', '📢', '#f59e0b'),
  ('Documentation', 'documentation', '📄', '#10b981'),
  ('Tools & Resources', 'tools-resources', '🛠️', '#6366f1'),
  ('Articles & Blogs', 'articles-blogs', '📰', '#ef4444'),
  ('Videos & Tutorials', 'videos-tutorials', '🎬', '#14b8a6'),
  ('Research', 'research', '🔬', '#a855f7'),
  ('Other', 'other', '🔗', '#64748b');

-- Row Level Security (allow public read, authenticated write)
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on links" ON links FOR SELECT USING (true);
CREATE POLICY "Allow service role insert on links" ON links FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role delete on links" ON links FOR DELETE USING (true);

CREATE POLICY "Allow public read on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow service role insert on categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role update on categories" ON categories FOR UPDATE USING (true);
