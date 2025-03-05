-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('admin', 'Full system access with user management capabilities'),
  ('editor', 'Content management with limited analytics access'),
  ('user', 'Basic access to view content and manage own profile')
ON CONFLICT (name) DO NOTHING;

-- Add role_id to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS role_id INTEGER REFERENCES roles(id);

-- Create default role assignment function
CREATE OR REPLACE FUNCTION set_default_role()
RETURNS TRIGGER AS $$
BEGIN
  -- Get the user role ID (default to 'user' role)
  NEW.role_id := (SELECT id FROM roles WHERE name = 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to set default role on user creation
DROP TRIGGER IF EXISTS set_user_role ON users;
CREATE TRIGGER set_user_role
BEFORE INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION set_default_role();

-- Enable realtime for roles table
alter publication supabase_realtime add table roles;
