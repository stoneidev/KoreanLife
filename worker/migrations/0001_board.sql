-- Board MVP: posts + single-level replies
CREATE TABLE IF NOT EXISTS posts (
  id TEXT PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  author_name TEXT NOT NULL,
  device_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  lang TEXT NOT NULL DEFAULT 'en'
);

CREATE TABLE IF NOT EXISTS replies (
  id TEXT PRIMARY KEY NOT NULL,
  post_id TEXT NOT NULL,
  body TEXT NOT NULL,
  author_name TEXT NOT NULL,
  device_hash TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_replies_post_created ON replies(post_id, created_at ASC);
