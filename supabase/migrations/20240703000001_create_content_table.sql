-- Create content table
CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  author_id UUID NOT NULL REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'draft',
  category TEXT,
  tags TEXT[],
  visibility TEXT NOT NULL DEFAULT 'public',
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on content table
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

-- Create policies for content table
-- Admin can do everything
DROP POLICY IF EXISTS "Admins can do everything" ON content;
CREATE POLICY "Admins can do everything"
  ON content
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role_id = (SELECT id FROM roles WHERE name = 'admin')
    )
  );

-- Editors can read all content
DROP POLICY IF EXISTS "Editors can read all content" ON content;
CREATE POLICY "Editors can read all content"
  ON content FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role_id = (SELECT id FROM roles WHERE name = 'editor')
    )
  );

-- Editors can insert and update their own content
DROP POLICY IF EXISTS "Editors can insert their own content" ON content;
CREATE POLICY "Editors can insert their own content"
  ON content FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role_id = (SELECT id FROM roles WHERE name = 'editor')
    )
    AND author_id = auth.uid()
  );

DROP POLICY IF EXISTS "Editors can update their own content" ON content;
CREATE POLICY "Editors can update their own content"
  ON content FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role_id = (SELECT id FROM roles WHERE name = 'editor')
    )
    AND author_id = auth.uid()
  );

-- Regular users can only read public content
DROP POLICY IF EXISTS "Users can read public content" ON content;
CREATE POLICY "Users can read public content"
  ON content FOR SELECT
  USING (
    visibility = 'public'
    OR (
      visibility = 'registered'
      AND auth.uid() IS NOT NULL
    )
  );

-- Enable realtime for content table
alter publication supabase_realtime add table content;
