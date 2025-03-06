-- Drop the existing foreign key constraint if it exists
ALTER TABLE content DROP CONSTRAINT IF EXISTS content_author_id_fkey;

-- Add the foreign key constraint to link content.author_id to users.id
ALTER TABLE content ADD CONSTRAINT content_author_id_fkey FOREIGN KEY (author_id) REFERENCES auth.users(id);

-- Create a view to join content with users for easier querying
CREATE OR REPLACE VIEW content_with_users AS
SELECT 
  c.*,
  u.id as user_id,
  u.email,
  u.full_name,
  u.avatar_url
FROM 
  content c
JOIN 
  users u ON c.author_id = u.id;

-- Grant access to the view
GRANT SELECT ON content_with_users TO authenticated;
GRANT SELECT ON content_with_users TO anon;

-- Update the RLS policies to ensure proper access
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