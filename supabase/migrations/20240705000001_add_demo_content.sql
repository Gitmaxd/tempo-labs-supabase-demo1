-- Add demo content for the application

-- First, get the admin user ID
DO $$
DECLARE
  admin_user_id UUID;
  editor_role_id INT;
  editor_user_id UUID;
BEGIN
  -- Get the admin user ID (assuming the user with email gitmaxd@gmail.com exists and is an admin)
  SELECT id INTO admin_user_id FROM users WHERE email = 'gitmaxd@gmail.com';
  
  -- If admin user doesn't exist, use the first user as fallback
  IF admin_user_id IS NULL THEN
    SELECT id INTO admin_user_id FROM users LIMIT 1;
  END IF;
  
  -- Get the editor role ID
  SELECT id INTO editor_role_id FROM roles WHERE name = 'editor';
  
  -- Create an editor user if it doesn't exist
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'editor@example.com') THEN
    -- Insert into auth.users first
    INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token)
    VALUES 
    ('00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated', 'editor@example.com', '$2a$10$rG4a3RJWRrK1x7JXnGXMIOuLe5JQTkrga1IEs.knOk.MjIxUEXlle', now(), null, now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Demo Editor"}', now(), now(), '', null, '', '');
    
    -- Get the newly created user ID
    SELECT id INTO editor_user_id FROM auth.users WHERE email = 'editor@example.com';
    
    -- Insert into public.users
    INSERT INTO users (id, full_name, email, created_at, token_identifier, role_id)
    VALUES (editor_user_id, 'Demo Editor', 'editor@example.com', now(), editor_user_id, editor_role_id);
  ELSE
    -- Get existing editor user ID
    SELECT id INTO editor_user_id FROM auth.users WHERE email = 'editor@example.com';
  END IF;
  
  -- Add demo content
  -- 1. Welcome Article
  INSERT INTO content (title, excerpt, content, author_id, status, category, tags, visibility, views, created_at, updated_at)
  VALUES (
    'Welcome to Supabase Role-Based Authentication Demo',
    'An introduction to the features and capabilities of this demo application.',
    '<h2>Welcome to the Supabase Role-Based Authentication Demo!</h2><p>This application demonstrates how to implement role-based access control using Supabase and Next.js. You can explore different user roles and their permissions.</p><p>Key features include:</p><ul><li>Three distinct user roles: Admin, Editor, and User</li><li>Secure authentication with email/password</li><li>Role-specific UI and access controls</li><li>Content management system</li><li>User profile management</li></ul><p>Feel free to explore the application and test the different roles and permissions!</p>',
    admin_user_id,
    'published',
    'General',
    ARRAY['welcome', 'introduction', 'guide'],
    'public',
    42,
    now() - interval '7 days',
    now() - interval '7 days'
  );
  
  -- 2. Getting Started Tutorial
  INSERT INTO content (title, excerpt, content, author_id, status, category, tags, visibility, views, created_at, updated_at)
  VALUES (
    'Getting Started with Supabase Authentication',
    'Learn how to implement authentication in your own applications using Supabase.',
    '<h2>Getting Started with Supabase Authentication</h2><p>Supabase provides a powerful and flexible authentication system that supports multiple authentication methods.</p><h3>Setting Up Supabase Auth</h3><p>To get started, you need to:</p><ol><li>Create a Supabase project</li><li>Configure authentication providers</li><li>Implement sign-up and sign-in flows</li><li>Set up row-level security</li></ol><p>This demo uses email/password authentication, but Supabase also supports OAuth providers like Google, GitHub, and more.</p><h3>Role-Based Access Control</h3><p>Implementing RBAC with Supabase involves:</p><ol><li>Creating a roles table</li><li>Assigning roles to users</li><li>Implementing permission checks in your application</li><li>Setting up appropriate RLS policies</li></ol>',
    admin_user_id,
    'published',
    'Tutorial',
    ARRAY['authentication', 'tutorial', 'supabase'],
    'public',
    78,
    now() - interval '5 days',
    now() - interval '5 days'
  );
  
  -- 3. Admin Guide
  INSERT INTO content (title, excerpt, content, author_id, status, category, tags, visibility, views, created_at, updated_at)
  VALUES (
    'Admin Dashboard Guide',
    'A comprehensive guide to the admin dashboard and its features.',
    '<h2>Admin Dashboard Guide</h2><p>As an admin, you have access to powerful tools to manage users, content, and system settings.</p><h3>User Management</h3><p>In the User Management section, you can:</p><ul><li>View all registered users</li><li>Change user roles</li><li>Disable user accounts</li><li>Reset user passwords</li></ul><h3>Analytics</h3><p>The Analytics dashboard provides insights into:</p><ul><li>User growth and engagement</li><li>Content performance</li><li>System usage statistics</li></ul><h3>System Settings</h3><p>Configure various aspects of the application through the Settings panel.</p>',
    admin_user_id,
    'published',
    'Documentation',
    ARRAY['admin', 'guide', 'dashboard'],
    'registered',
    35,
    now() - interval '3 days',
    now() - interval '3 days'
  );
  
  -- 4. Editor Guide
  INSERT INTO content (title, excerpt, content, author_id, status, category, tags, visibility, views, created_at, updated_at)
  VALUES (
    'Content Editor Guide',
    'Learn how to create and manage content as an editor.',
    '<h2>Content Editor Guide</h2><p>As an editor, you have the ability to create, edit, and manage content in the system.</p><h3>Creating Content</h3><p>To create new content:</p><ol><li>Navigate to the Content Management section</li><li>Click "Create New Content"</li><li>Fill in the title, excerpt, and main content</li><li>Set the appropriate category and tags</li><li>Choose the visibility level</li><li>Save as draft or publish immediately</li></ol><h3>Managing Content</h3><p>You can edit existing content, change its status, or delete content you have created.</p>',
    editor_user_id,
    'published',
    'Documentation',
    ARRAY['editor', 'guide', 'content'],
    'registered',
    27,
    now() - interval '2 days',
    now() - interval '2 days'
  );
  
  -- 5. Draft Article
  INSERT INTO content (title, excerpt, content, author_id, status, category, tags, visibility, views, created_at, updated_at)
  VALUES (
    'Upcoming Features (Draft)',
    'A preview of upcoming features planned for the application.',
    '<h2>Upcoming Features</h2><p>We are working on several exciting new features for the application:</p><ul><li>OAuth integration with multiple providers</li><li>Enhanced analytics dashboard</li><li>User activity logging</li><li>Content approval workflows</li><li>Advanced permission system</li></ul><p>Stay tuned for these updates in the coming weeks!</p>',
    admin_user_id,
    'draft',
    'News',
    ARRAY['roadmap', 'features', 'upcoming'],
    'private',
    3,
    now() - interval '1 day',
    now() - interval '1 day'
  );
  
  -- 6. Another Draft Article
  INSERT INTO content (title, excerpt, content, author_id, status, category, tags, visibility, views, created_at, updated_at)
  VALUES (
    'Advanced Supabase Techniques (Draft)',
    'Exploring advanced techniques for working with Supabase in production applications.',
    '<h2>Advanced Supabase Techniques</h2><p>This article will cover advanced techniques for using Supabase in production applications.</p><h3>Topics to Cover:</h3><ul><li>Optimizing database queries</li><li>Implementing complex RLS policies</li><li>Working with Supabase Functions</li><li>Real-time subscriptions</li><li>Handling large datasets</li></ul><p>Note: This article is still in progress and will be published soon.</p>',
    editor_user_id,
    'draft',
    'Tutorial',
    ARRAY['advanced', 'supabase', 'techniques'],
    'private',
    2,
    now(),
    now()
  );
  
  RAISE NOTICE 'Demo content has been added successfully';
END $$;
