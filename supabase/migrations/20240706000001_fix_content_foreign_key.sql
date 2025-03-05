-- Fix the foreign key relationship in the content table
ALTER TABLE content DROP CONSTRAINT IF EXISTS content_author_id_fkey;
ALTER TABLE content ADD CONSTRAINT content_author_id_fkey FOREIGN KEY (author_id) REFERENCES users(id);

-- Enable realtime for content table
alter publication supabase_realtime add table content;

-- Add some sample content if none exists
INSERT INTO content (title, excerpt, content, author_id, status, category, tags, visibility, views, created_at, updated_at)
SELECT 
  'Getting Started with Supabase Auth', 
  'Learn how to implement role-based authentication with Supabase and Next.js', 
  '<p>This is a comprehensive guide to implementing authentication with Supabase in your Next.js application. We will cover user registration, login, role management, and more.</p><h2>Setting Up Supabase</h2><p>First, create a new Supabase project and configure your environment variables...</p>', 
  id, 
  'published', 
  'tutorial', 
  ARRAY['supabase', 'authentication', 'nextjs'], 
  'public', 
  42, 
  NOW(), 
  NOW()
FROM users
WHERE roles.name = 'admin'
LIMIT 1
ON CONFLICT DO NOTHING;

INSERT INTO content (title, excerpt, content, author_id, status, category, tags, visibility, views, created_at, updated_at)
SELECT 
  'Role-Based Access Control Explained', 
  'Understanding how to implement RBAC in your web applications', 
  '<p>Role-Based Access Control (RBAC) is a security approach that restricts system access to authorized users based on roles. This article explains how to implement it effectively.</p><h2>What is RBAC?</h2><p>RBAC is an approach to restricting system access to authorized users...</p>', 
  id, 
  'published', 
  'documentation', 
  ARRAY['security', 'rbac', 'authorization'], 
  'public', 
  27, 
  NOW(), 
  NOW()
FROM users
WHERE roles.name = 'admin'
LIMIT 1
ON CONFLICT DO NOTHING;
