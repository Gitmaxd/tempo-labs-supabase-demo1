-- Create roles enum type
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'user');

-- Add role column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS role user_role NOT NULL DEFAULT 'user';

-- Enable realtime for users table
alter publication supabase_realtime add table users;
